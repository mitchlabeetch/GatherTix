import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, orgMemberProcedure, publicProcedure } from "../trpc/trpc";
import { generateOrderNumber, generateTicketNumber, generateQRToken } from "@ticketing/shared/utils";
import { createOrderSchema } from "@ticketing/shared/validations";
import { addMinutes } from "date-fns";

export const orderRouter = router({
  /**
   * List orders for an event
   */
  list: orgMemberProcedure("MEMBER")
    .input(
      z.object({
        organizationId: z.string(),
        eventId: z.string().optional(),
        search: z.string().optional(),
        status: z.enum(["PENDING", "COMPLETED", "FAILED", "CANCELLED", "REFUNDED", "EXPIRED"]).optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const { eventId, search, status, page, limit } = input;

      const where: Record<string, unknown> = {};

      if (eventId) {
        where.eventId = eventId;
      } else {
        // If no eventId, filter by organization
        const events = await ctx.prisma.event.findMany({
          where: { organizationId: input.organizationId },
          select: { id: true },
        });
        where.eventId = { in: events.map((e) => e.id) };
      }

      if (status) {
        where.status = status;
      }

      if (search) {
        where.OR = [
          { orderNumber: { contains: search, mode: "insensitive" } },
          { customerEmail: { contains: search, mode: "insensitive" } },
          { customerName: { contains: search, mode: "insensitive" } },
        ];
      }

      const [orders, total] = await Promise.all([
        ctx.prisma.order.findMany({
          where,
          include: {
            event: {
              select: {
                id: true,
                title: true,
                startDate: true,
              },
            },
            tickets: {
              select: {
                id: true,
                ticketNumber: true,
                attendeeName: true,
                status: true,
              },
            },
            _count: {
              select: {
                tickets: true,
              },
            },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        ctx.prisma.order.count({ where }),
      ]);

      return {
        data: orders,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNextPage: page * limit < total,
          hasPrevPage: page > 1,
        },
      };
    }),

  /**
   * Get order by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findUnique({
        where: { id: input.id },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              startDate: true,
              venueName: true,
              organizationId: true,
            },
          },
          tickets: {
            include: {
              ticketType: {
                select: {
                  name: true,
                },
              },
            },
          },
          payments: true,
        },
      });

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      // Check access - user must be order owner, org member, or admin
      const hasAccess =
        order.customerEmail === ctx.user.email ||
        ctx.user.role === "ADMIN" ||
        (await ctx.prisma.organizationMember.findFirst({
          where: {
            organizationId: order.event.organizationId,
            userId: ctx.user.id,
          },
        }));

      if (!hasAccess) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this order",
        });
      }

      return order;
    }),

  /**
   * Get order by order number (public)
   */
  getByNumber: publicProcedure
    .input(z.object({ orderNumber: z.string(), email: z.string().email() }))
    .query(async ({ ctx, input }) => {
      const { orderNumber, email } = input;

      const order = await ctx.prisma.order.findUnique({
        where: { orderNumber },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              startDate: true,
              venueName: true,
              timezone: true,
            },
          },
          tickets: {
            include: {
              ticketType: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      // Verify email matches
      if (order.customerEmail !== email) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email for this order",
        });
      }

      return order;
    }),

  /**
   * Create order
   */
  create: publicProcedure.input(createOrderSchema).mutation(async ({ ctx, input }) => {
    const { eventId, items, customerEmail, customerName, customerPhone } = input;

    // Get event
    const event = await ctx.prisma.event.findUnique({
      where: { id: eventId },
      include: {
        ticketTypes: true,
      },
    });

    if (!event) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Event not found",
      });
    }

    // Check if event is published and accepting orders
    if (event.status !== "PUBLISHED") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Event is not available for booking",
      });
    }

    // Validate ticket types and calculate total
    let subtotal = 0;
    const ticketTypeMap = new Map(event.ticketTypes.map((tt) => [tt.id, tt]));

    for (const item of items) {
      const ticketType = ticketTypeMap.get(item.ticketTypeId);

      if (!ticketType) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Invalid ticket type: ${item.ticketTypeId}`,
        });
      }

      // Check availability
      const available = ticketType.quantity - ticketType.sold;
      if (item.quantity > available) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Not enough tickets available for ${ticketType.name}. Only ${available} left.`,
        });
      }

      // Check min/max per order
      if (item.quantity < ticketType.minPerOrder) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Minimum ${ticketType.minPerOrder} tickets required for ${ticketType.name}`,
        });
      }

      if (item.quantity > ticketType.maxPerOrder) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Maximum ${ticketType.maxPerOrder} tickets allowed for ${ticketType.name}`,
        });
      }

      // Check sales period
      const now = new Date();
      if (ticketType.salesStart && now < ticketType.salesStart) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Sales for ${ticketType.name} have not started yet`,
        });
      }

      if (ticketType.salesEnd && now > ticketType.salesEnd) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Sales for ${ticketType.name} have ended`,
        });
      }

      subtotal += ticketType.price.toNumber() * item.quantity;
    }

    // Calculate fees (simplified - 3% + $0.30 per ticket)
    const totalTickets = items.reduce((sum, item) => sum + item.quantity, 0);
    const fees = subtotal * 0.03 + totalTickets * 0.3;
    const total = subtotal + fees;

    // Create order
    const order = await ctx.prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        eventId,
        customerEmail,
        customerName,
        customerPhone,
        subtotal,
        fees,
        discount: 0,
        tax: 0,
        total,
        currency: "USD",
        status: "PENDING",
        expiresAt: addMinutes(new Date(), 15),
      },
    });

    // Create tickets
    const ticketPromises: Promise<unknown>[] = [];

    for (const item of items) {
      const ticketType = ticketTypeMap.get(item.ticketTypeId)!;

      for (let i = 0; i < item.quantity; i++) {
        ticketPromises.push(
          ctx.prisma.ticket.create({
            data: {
              ticketNumber: generateTicketNumber(),
              orderId: order.id,
              ticketTypeId: item.ticketTypeId,
              eventId,
              attendeeName: customerName || customerEmail,
              attendeeEmail: customerEmail,
              qrToken: generateQRToken(),
              status: "ACTIVE",
            },
          })
        );
      }

      // Update sold count
      ticketPromises.push(
        ctx.prisma.ticketType.update({
          where: { id: item.ticketTypeId },
          data: { sold: { increment: item.quantity } },
        })
      );
    }

    await Promise.all(ticketPromises);

    return {
      order: await ctx.prisma.order.findUnique({
        where: { id: order.id },
        include: {
          tickets: {
            include: {
              ticketType: {
                select: {
                  name: true,
                  price: true,
                },
              },
            },
          },
        },
      }),
    };
  }),

  /**
   * Cancel order
   */
  cancel: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const order = await ctx.prisma.order.findUnique({
        where: { id },
        include: {
          event: true,
          tickets: true,
        },
      });

      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }

      // Check access
      const hasAccess =
        order.customerEmail === ctx.user.email ||
        ctx.user.role === "ADMIN" ||
        (await ctx.prisma.organizationMember.findFirst({
          where: {
            organizationId: order.event.organizationId,
            userId: ctx.user.id,
          },
        }));

      if (!hasAccess) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this order",
        });
      }

      // Can only cancel pending orders
      if (order.status !== "PENDING") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Cannot cancel order with status: ${order.status}`,
        });
      }

      // Cancel order and tickets
      await ctx.prisma.$transaction([
        ctx.prisma.order.update({
          where: { id },
          data: { status: "CANCELLED" },
        }),
        ctx.prisma.ticket.updateMany({
          where: { orderId: id },
          data: { status: "CANCELLED" },
        }),
        // Restore ticket type quantities
        ...order.tickets.map((ticket) =>
          ctx.prisma.ticketType.update({
            where: { id: ticket.ticketTypeId },
            data: { sold: { decrement: 1 } },
          })
        ),
      ]);

      return { success: true };
    }),

  /**
   * Get order statistics for an event
   */
  getStats: orgMemberProcedure("MEMBER")
    .input(
      z.object({
        organizationId: z.string(),
        eventId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { eventId } = input;

      const [
        totalOrders,
        completedOrders,
        pendingOrders,
        refundedOrders,
        totalRevenue,
      ] = await Promise.all([
        ctx.prisma.order.count({ where: { eventId } }),
        ctx.prisma.order.count({ where: { eventId, status: "COMPLETED" } }),
        ctx.prisma.order.count({ where: { eventId, status: "PENDING" } }),
        ctx.prisma.order.count({ where: { eventId, status: "REFUNDED" } }),
        ctx.prisma.order.aggregate({
          where: { eventId, status: "COMPLETED" },
          _sum: { total: true },
        }),
      ]);

      return {
        totalOrders,
        completedOrders,
        pendingOrders,
        refundedOrders,
        totalRevenue: totalRevenue._sum.total?.toNumber() || 0,
        conversionRate: totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0,
      };
    }),
});

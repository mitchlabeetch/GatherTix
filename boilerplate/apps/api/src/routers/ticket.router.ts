import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, orgMemberProcedure, publicProcedure } from "../trpc/trpc";
import { generateQRToken, generateTicketNumber } from "@ticketing/shared/utils";

export const ticketRouter = router({
  /**
   * List tickets for an event
   */
  list: orgMemberProcedure("MEMBER")
    .input(
      z.object({
        organizationId: z.string(),
        eventId: z.string(),
        search: z.string().optional(),
        status: z.enum(["ACTIVE", "USED", "CANCELLED", "REFUNDED", "TRANSFERRED"]).optional(),
        checkedIn: z.boolean().optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const { eventId, search, status, checkedIn, page, limit } = input;

      const where: Record<string, unknown> = { eventId };

      if (status) {
        where.status = status;
      }

      if (checkedIn !== undefined) {
        where.checkedIn = checkedIn;
      }

      if (search) {
        where.OR = [
          { ticketNumber: { contains: search, mode: "insensitive" } },
          { attendeeName: { contains: search, mode: "insensitive" } },
          { attendeeEmail: { contains: search, mode: "insensitive" } },
        ];
      }

      const [tickets, total] = await Promise.all([
        ctx.prisma.ticket.findMany({
          where,
          include: {
            ticketType: {
              select: {
                name: true,
                price: true,
              },
            },
            order: {
              select: {
                orderNumber: true,
              },
            },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        ctx.prisma.ticket.count({ where }),
      ]);

      return {
        data: tickets,
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
   * Get ticket by ID
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const ticket = await ctx.prisma.ticket.findUnique({
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
          ticketType: {
            select: {
              name: true,
              price: true,
            },
          },
          order: {
            select: {
              orderNumber: true,
              customerEmail: true,
            },
          },
          checkIns: {
            orderBy: { checkedInAt: "desc" },
            take: 1,
          },
        },
      });

      if (!ticket) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Ticket not found",
        });
      }

      // Check access
      const membership = await ctx.prisma.organizationMember.findUnique({
        where: {
          organizationId_userId: {
            organizationId: ticket.event.organizationId,
            userId: ctx.user.id,
          },
        },
      });

      if (!membership && ctx.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this ticket",
        });
      }

      return ticket;
    }),

  /**
   * Validate QR token (for check-in)
   */
  validateQR: orgMemberProcedure("MEMBER")
    .input(
      z.object({
        organizationId: z.string(),
        qrToken: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { qrToken } = input;

      const ticket = await ctx.prisma.ticket.findUnique({
        where: { qrToken },
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
          ticketType: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!ticket) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invalid ticket QR code",
        });
      }

      // Verify ticket belongs to this organization
      if (ticket.event.organizationId !== input.organizationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Ticket does not belong to this organization",
        });
      }

      // Check if already checked in
      if (ticket.checkedIn) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Ticket has already been checked in",
        });
      }

      // Check ticket status
      if (ticket.status !== "ACTIVE") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Ticket is ${ticket.status.toLowerCase()}`,
        });
      }

      return {
        valid: true,
        ticket: {
          id: ticket.id,
          ticketNumber: ticket.ticketNumber,
          attendeeName: ticket.attendeeName,
          attendeeEmail: ticket.attendeeEmail,
          ticketType: ticket.ticketType.name,
          event: ticket.event,
        },
      };
    }),

  /**
   * Check in ticket
   */
  checkIn: orgMemberProcedure("MEMBER")
    .input(
      z.object({
        organizationId: z.string(),
        ticketId: z.string(),
        method: z.enum(["MANUAL", "QR_SCAN", "APP"]).default("MANUAL"),
        latitude: z.number().optional(),
        longitude: z.number().optional(),
        deviceId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { ticketId, method, latitude, longitude, deviceId } = input;

      const ticket = await ctx.prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
          event: {
            select: {
              organizationId: true,
            },
          },
        },
      });

      if (!ticket) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Ticket not found",
        });
      }

      // Verify ticket belongs to this organization
      if (ticket.event.organizationId !== input.organizationId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Ticket does not belong to this organization",
        });
      }

      // Check if already checked in
      if (ticket.checkedIn) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Ticket has already been checked in",
        });
      }

      // Check ticket status
      if (ticket.status !== "ACTIVE") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Ticket is ${ticket.status.toLowerCase()}`,
        });
      }

      // Perform check-in
      const [updatedTicket, checkIn] = await ctx.prisma.$transaction([
        ctx.prisma.ticket.update({
          where: { id: ticketId },
          data: {
            checkedIn: true,
            checkedInAt: new Date(),
            checkedInBy: ctx.user.id,
          },
        }),
        ctx.prisma.checkIn.create({
          data: {
            ticketId,
            eventId: ticket.eventId,
            checkedInBy: ctx.user.id,
            method,
            latitude,
            longitude,
            deviceId,
          },
        }),
      ]);

      return {
        success: true,
        ticket: updatedTicket,
        checkIn,
      };
    }),

  /**
   * Get check-in stats for an event
   */
  getCheckInStats: orgMemberProcedure("MEMBER")
    .input(
      z.object({
        organizationId: z.string(),
        eventId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { eventId } = input;

      const [totalTickets, checkedInTickets, ticketTypeStats] = await Promise.all([
        ctx.prisma.ticket.count({
          where: { eventId, status: "ACTIVE" },
        }),
        ctx.prisma.ticket.count({
          where: { eventId, status: "ACTIVE", checkedIn: true },
        }),
        ctx.prisma.ticket.groupBy({
          by: ["ticketTypeId"],
          where: { eventId },
          _count: {
            id: true,
          },
          _sum: {
            checkedIn: true,
          },
        }),
      ]);

      // Get ticket type names
      const ticketTypes = await ctx.prisma.ticketType.findMany({
        where: {
          id: { in: ticketTypeStats.map((s) => s.ticketTypeId) },
        },
        select: {
          id: true,
          name: true,
        },
      });

      const typeStats = ticketTypeStats.map((stat) => ({
        name: ticketTypes.find((t) => t.id === stat.ticketTypeId)?.name || "Unknown",
        total: stat._count.id,
        checkedIn: stat._sum.checkedIn || 0,
      }));

      return {
        totalTickets,
        checkedInTickets,
        checkInRate: totalTickets > 0 ? (checkedInTickets / totalTickets) * 100 : 0,
        ticketTypeStats: typeStats,
      };
    }),
});

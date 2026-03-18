// GatherTix - Self-hosted ticketing platform for non-profits and community groups.
// Copyright (C) 2024 GatherTix Contributors
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, orgMemberProcedure, publicProcedure } from "../trpc/trpc";
import { generateUniqueSlug } from "@ticketing/shared/utils";
import { createEventSchema, updateEventSchema, createTicketTypeSchema } from "@ticketing/shared/validations";

export const eventRouter = router({
  /**
   * List events (public)
   */
  list: publicProcedure
    .input(
      z.object({
        organizationSlug: z.string().optional(),
        search: z.string().optional(),
        status: z.enum(["DRAFT", "PUBLISHED", "CANCELLED", "COMPLETED"]).optional(),
        page: z.number().default(1),
        limit: z.number().default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const { organizationSlug, search, status, page, limit } = input;

      const where: Record<string, unknown> = {};

      if (organizationSlug) {
        const org = await ctx.prisma.organization.findUnique({
          where: { slug: organizationSlug },
        });
        if (org) {
          where.organizationId = org.id;
        }
      }

      if (status) {
        where.status = status;
      } else {
        // Default to published events for public
        where.status = "PUBLISHED";
        where.isPublic = true;
      }

      if (search) {
        where.OR = [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { city: { contains: search, mode: "insensitive" } },
        ];
      }

      const [events, total] = await Promise.all([
        ctx.prisma.event.findMany({
          where,
          include: {
            organization: {
              select: {
                id: true,
                name: true,
                slug: true,
                logo: true,
              },
            },
            ticketTypes: {
              where: { isVisible: true },
              select: {
                id: true,
                name: true,
                price: true,
                currency: true,
                quantity: true,
                sold: true,
              },
              orderBy: { sortOrder: "asc" },
            },
            _count: {
              select: {
                tickets: true,
              },
            },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { startDate: "asc" },
        }),
        ctx.prisma.event.count({ where }),
      ]);

      return {
        data: events.map((event) => ({
          id: event.id,
          slug: event.slug,
          title: event.title,
          description: event.description,
          image: event.image,
          startDate: event.startDate,
          endDate: event.endDate,
          timezone: event.timezone,
          venueName: event.venueName,
          city: event.city,
          state: event.state,
          country: event.country,
          isVirtual: event.isVirtual,
          virtualUrl: event.virtualUrl,
          maxAttendees: event.maxAttendees,
          isPublic: event.isPublic,
          status: event.status,
          organization: event.organization,
          ticketTypes: event.ticketTypes,
          ticketCount: event._count.tickets,
        })),
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
   * Get event by slug (public)
   */
  getBySlug: publicProcedure
    .input(z.object({ organizationSlug: z.string(), eventSlug: z.string() }))
    .query(async ({ ctx, input }) => {
      const { organizationSlug, eventSlug } = input;

      const organization = await ctx.prisma.organization.findUnique({
        where: { slug: organizationSlug },
      });

      if (!organization) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }

      const event = await ctx.prisma.event.findUnique({
        where: {
          organizationId_slug: {
            organizationId: organization.id,
            slug: eventSlug,
          },
        },
        include: {
          organization: {
            select: {
              id: true,
              name: true,
              slug: true,
              logo: true,
              website: true,
              email: true,
              phone: true,
            },
          },
          ticketTypes: {
            where: { isVisible: true },
            orderBy: { sortOrder: "asc" },
          },
          _count: {
            select: {
              tickets: true,
            },
          },
        },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      // Check if event is accessible
      if (event.status !== "PUBLISHED" && !event.isPublic) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      return {
        id: event.id,
        slug: event.slug,
        title: event.title,
        description: event.description,
        image: event.image,
        startDate: event.startDate,
        endDate: event.endDate,
        timezone: event.timezone,
        venueName: event.venueName,
        address: event.address,
        city: event.city,
        state: event.state,
        country: event.country,
        postalCode: event.postalCode,
        latitude: event.latitude,
        longitude: event.longitude,
        isVirtual: event.isVirtual,
        virtualUrl: event.virtualUrl,
        maxAttendees: event.maxAttendees,
        isPublic: event.isPublic,
        status: event.status,
        organization: event.organization,
        ticketTypes: event.ticketTypes,
        ticketCount: event._count.tickets,
      };
    }),

  /**
   * Get event by ID (for editing)
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input.id },
        include: {
          organization: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          ticketTypes: {
            orderBy: { sortOrder: "asc" },
          },
          _count: {
            select: {
              orders: true,
              tickets: true,
            },
          },
        },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      // Check if user is a member of the organization
      const membership = await ctx.prisma.organizationMember.findUnique({
        where: {
          organizationId_userId: {
            organizationId: event.organizationId,
            userId: ctx.user.id,
          },
        },
      });

      if (!membership && ctx.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this event",
        });
      }

      return {
        ...event,
        orderCount: event._count.orders,
        ticketCount: event._count.tickets,
        myRole: membership?.role,
      };
    }),

  /**
   * Create event
   */
  create: orgMemberProcedure("ADMIN")
    .input(createEventSchema)
    .mutation(async ({ ctx, input }) => {
      const { title, slug: inputSlug, ...data } = input;

      // Generate slug if not provided
      const slug = inputSlug || generateUniqueSlug(title);

      // Check if slug is taken in this organization
      const existingEvent = await ctx.prisma.event.findUnique({
        where: {
          organizationId_slug: {
            organizationId: data.organizationId,
            slug,
          },
        },
      });

      if (existingEvent) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "An event with this slug already exists in this organization",
        });
      }

      const event = await ctx.prisma.event.create({
        data: {
          title,
          slug,
          ...data,
          status: "DRAFT",
        },
      });

      return {
        id: event.id,
        slug: event.slug,
        title: event.title,
        status: event.status,
      };
    }),

  /**
   * Update event
   */
  update: orgMemberProcedure("ADMIN")
    .input(
      z.object({
        id: z.string(),
        data: updateEventSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;

      // Get event to check organization
      const event = await ctx.prisma.event.findUnique({
        where: { id },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      // Check if new slug is taken
      if (data.slug) {
        const existingEvent = await ctx.prisma.event.findFirst({
          where: {
            organizationId: event.organizationId,
            slug: data.slug,
            NOT: { id },
          },
        });

        if (existingEvent) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "An event with this slug already exists in this organization",
          });
        }
      }

      const updatedEvent = await ctx.prisma.event.update({
        where: { id },
        data,
      });

      return {
        id: updatedEvent.id,
        slug: updatedEvent.slug,
        title: updatedEvent.title,
        status: updatedEvent.status,
      };
    }),

  /**
   * Publish event
   */
  publish: orgMemberProcedure("ADMIN")
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const event = await ctx.prisma.event.update({
        where: { id },
        data: {
          status: "PUBLISHED",
          publishedAt: new Date(),
        },
      });

      return {
        id: event.id,
        status: event.status,
        publishedAt: event.publishedAt,
      };
    }),

  /**
   * Cancel event
   */
  cancel: orgMemberProcedure("ADMIN")
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      const event = await ctx.prisma.event.update({
        where: { id },
        data: {
          status: "CANCELLED",
        },
      });

      return {
        id: event.id,
        status: event.status,
      };
    }),

  /**
   * Delete event
   */
  delete: orgMemberProcedure("ADMIN")
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      // Check for completed orders
      const completedOrders = await ctx.prisma.order.count({
        where: {
          eventId: id,
          status: "COMPLETED",
        },
      });

      if (completedOrders > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cannot delete event with completed orders. Cancel the event instead.",
        });
      }

      await ctx.prisma.event.delete({
        where: { id },
      });

      return { success: true };
    }),

  /**
   * Create ticket type
   */
  createTicketType: orgMemberProcedure("ADMIN")
    .input(
      z.object({
        eventId: z.string(),
        data: createTicketTypeSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, data } = input;

      // Verify event exists and user has access
      const event = await ctx.prisma.event.findUnique({
        where: { id: eventId },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Event not found",
        });
      }

      const ticketType = await ctx.prisma.ticketType.create({
        data: {
          ...data,
          eventId,
        },
      });

      return ticketType;
    }),

  /**
   * Update ticket type
   */
  updateTicketType: orgMemberProcedure("ADMIN")
    .input(
      z.object({
        id: z.string(),
        data: createTicketTypeSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;

      const ticketType = await ctx.prisma.ticketType.update({
        where: { id },
        data,
      });

      return ticketType;
    }),

  /**
   * Delete ticket type
   */
  deleteTicketType: orgMemberProcedure("ADMIN")
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      // Check for sold tickets
      const ticketType = await ctx.prisma.ticketType.findUnique({
        where: { id },
      });

      if (ticketType && ticketType.sold > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cannot delete ticket type with sold tickets",
        });
      }

      await ctx.prisma.ticketType.delete({
        where: { id },
      });

      return { success: true };
    }),
});

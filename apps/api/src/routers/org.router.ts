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
import { router, protectedProcedure, orgMemberProcedure } from "../trpc/trpc";
import { generateUniqueSlug } from "@ticketing/shared/utils";
import { createOrganizationSchema, updateOrganizationSchema } from "@ticketing/shared/validations";

export const orgRouter = router({
  /**
   * List user's organizations
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const memberships = await ctx.prisma.organizationMember.findMany({
      where: { userId: ctx.user.id },
      include: {
        organization: {
          include: {
            _count: {
              select: {
                events: true,
                members: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return memberships.map((membership) => ({
      id: membership.organization.id,
      name: membership.organization.name,
      slug: membership.organization.slug,
      description: membership.organization.description,
      logo: membership.organization.logo,
      status: membership.organization.status,
      role: membership.role,
      eventCount: membership.organization._count.events,
      memberCount: membership.organization._count.members,
      joinedAt: membership.createdAt,
    }));
  }),

  /**
   * Get organization by slug
   */
  getBySlug: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const organization = await ctx.prisma.organization.findUnique({
        where: { slug: input.slug },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  firstName: true,
                  lastName: true,
                  avatar: true,
                },
              },
            },
          },
          _count: {
            select: {
              events: true,
            },
          },
        },
      });

      if (!organization) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Organization not found",
        });
      }

      // Check if user is a member
      const membership = organization.members.find((m) => m.userId === ctx.user.id);

      if (!membership && ctx.user.role !== "ADMIN") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not a member of this organization",
        });
      }

      return {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        description: organization.description,
        logo: organization.logo,
        website: organization.website,
        email: organization.email,
        phone: organization.phone,
        address: organization.address,
        city: organization.city,
        state: organization.state,
        country: organization.country,
        postalCode: organization.postalCode,
        status: organization.status,
        settings: organization.settings,
        eventCount: organization._count.events,
        members: organization.members.map((m) => ({
          id: m.user.id,
          email: m.user.email,
          firstName: m.user.firstName,
          lastName: m.user.lastName,
          avatar: m.user.avatar,
          role: m.role,
        })),
        myRole: membership?.role || null,
        createdAt: organization.createdAt,
      };
    }),

  /**
   * Create organization
   */
  create: protectedProcedure.input(createOrganizationSchema).mutation(async ({ ctx, input }) => {
    const { name, slug, ...rest } = input;

    // Check if slug is taken
    const existingOrg = await ctx.prisma.organization.findUnique({
      where: { slug },
    });

    if (existingOrg) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "An organization with this slug already exists",
      });
    }

    // Create organization
    const organization = await ctx.prisma.organization.create({
      data: {
        name,
        slug,
        ...rest,
      },
    });

    // Add creator as owner
    await ctx.prisma.organizationMember.create({
      data: {
        organizationId: organization.id,
        userId: ctx.user.id,
        role: "OWNER",
      },
    });

    return {
      id: organization.id,
      name: organization.name,
      slug: organization.slug,
      status: organization.status,
    };
  }),

  /**
   * Update organization
   */
  update: orgMemberProcedure("ADMIN")
    .input(
      z.object({
        organizationId: z.string(),
        data: updateOrganizationSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organizationId, data } = input;

      // Check if new slug is taken
      if (data.slug) {
        const existingOrg = await ctx.prisma.organization.findFirst({
          where: {
            slug: data.slug,
            NOT: { id: organizationId },
          },
        });

        if (existingOrg) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "An organization with this slug already exists",
          });
        }
      }

      const organization = await ctx.prisma.organization.update({
        where: { id: organizationId },
        data,
      });

      return {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        status: organization.status,
      };
    }),

  /**
   * Delete organization
   */
  delete: orgMemberProcedure("OWNER")
    .input(z.object({ organizationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { organizationId } = input;

      // Check for active events
      const activeEvents = await ctx.prisma.event.count({
        where: {
          organizationId,
          status: { in: ["PUBLISHED", "DRAFT"] },
        },
      });

      if (activeEvents > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Cannot delete organization with active events",
        });
      }

      await ctx.prisma.organization.delete({
        where: { id: organizationId },
      });

      return { success: true };
    }),

  /**
   * Invite member to organization
   */
  inviteMember: orgMemberProcedure("ADMIN")
    .input(
      z.object({
        organizationId: z.string(),
        email: z.string().email(),
        role: z.enum(["ADMIN", "MEMBER"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organizationId, email, role } = input;

      // Find user by email
      const user = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found with this email",
        });
      }

      // Check if already a member
      const existingMember = await ctx.prisma.organizationMember.findUnique({
        where: {
          organizationId_userId: {
            organizationId,
            userId: user.id,
          },
        },
      });

      if (existingMember) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User is already a member of this organization",
        });
      }

      const member = await ctx.prisma.organizationMember.create({
        data: {
          organizationId,
          userId: user.id,
          role,
        },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
      });

      return {
        id: member.user.id,
        email: member.user.email,
        firstName: member.user.firstName,
        lastName: member.user.lastName,
        avatar: member.user.avatar,
        role: member.role,
      };
    }),

  /**
   * Remove member from organization
   */
  removeMember: orgMemberProcedure("ADMIN")
    .input(
      z.object({
        organizationId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organizationId, userId } = input;

      // Cannot remove yourself if you're the owner
      if (userId === ctx.user.id) {
        const membership = await ctx.prisma.organizationMember.findUnique({
          where: {
            organizationId_userId: {
              organizationId,
              userId,
            },
          },
        });

        if (membership?.role === "OWNER") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot remove yourself as the owner. Transfer ownership first.",
          });
        }
      }

      await ctx.prisma.organizationMember.delete({
        where: {
          organizationId_userId: {
            organizationId,
            userId,
          },
        },
      });

      return { success: true };
    }),

  /**
   * Update member role
   */
  updateMemberRole: orgMemberProcedure("OWNER")
    .input(
      z.object({
        organizationId: z.string(),
        userId: z.string(),
        role: z.enum(["OWNER", "ADMIN", "MEMBER"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { organizationId, userId, role } = input;

      const member = await ctx.prisma.organizationMember.update({
        where: {
          organizationId_userId: {
            organizationId,
            userId,
          },
        },
        data: { role },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              avatar: true,
            },
          },
        },
      });

      return {
        id: member.user.id,
        email: member.user.email,
        firstName: member.user.firstName,
        lastName: member.user.lastName,
        avatar: member.user.avatar,
        role: member.role,
      };
    }),
});

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
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { Context } from "./context";

/**
 * tRPC router initialization
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error && error.cause.name === "ZodError"
            ? (error.cause as Error).message
            : null,
      },
    };
  },
});

/**
 * Export reusable router and procedure helpers
 */
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;

/**
 * Middleware to check if user is authenticated
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      session: ctx.session,
    },
  });
});

/**
 * Protected procedure - requires authentication
 */
export const protectedProcedure = t.procedure.use(isAuthed);

/**
 * Middleware to check if user is an admin
 */
const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }
  
  if (ctx.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You must be an admin to perform this action",
    });
  }
  
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
      session: ctx.session,
    },
  });
});

/**
 * Admin procedure - requires admin role
 */
export const adminProcedure = t.procedure.use(isAdmin);

/**
 * Middleware to check organization membership
 */
const isOrgMember = (requiredRole?: "OWNER" | "ADMIN" | "MEMBER") =>
  t.middleware(async ({ ctx, next, input }) => {
    if (!ctx.user || !ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to perform this action",
      });
    }

    const orgInput = input as { organizationId?: string };
    const organizationId = orgInput?.organizationId;

    if (!organizationId) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Organization ID is required",
      });
    }

    const membership = await ctx.prisma.organizationMember.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId: ctx.user.id,
        },
      },
    });

    if (!membership) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You are not a member of this organization",
      });
    }

    if (requiredRole) {
      const roleHierarchy = ["MEMBER", "ADMIN", "OWNER"];
      const userRoleIndex = roleHierarchy.indexOf(membership.role);
      const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);

      if (userRoleIndex < requiredRoleIndex) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `You must be a ${requiredRole} to perform this action`,
        });
      }
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
        session: ctx.session,
        membership,
      },
    });
  });

/**
 * Organization member procedure
 */
export const orgMemberProcedure = (requiredRole?: "OWNER" | "ADMIN" | "MEMBER") =>
  t.procedure.use(isOrgMember(requiredRole));

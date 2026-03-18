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
import { env } from "../config/env";

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
 * Origin/CSRF validation middleware — checks the Origin header on mutations
 * against allowed CORS origins. Prevents cross-site mutation attacks even
 * when cookies are sent (defense-in-depth alongside sameSite: strict).
 */
const validateOrigin = t.middleware(({ ctx, type, next }) => {
  if (type === "mutation") {
    const origin = ctx.req.headers.origin;
    if (origin) {
      const allowedOrigins = env.CORS_ORIGIN.split(",").map((s) => s.trim());
      if (!allowedOrigins.includes(origin)) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid request origin",
        });
      }
    }
  }
  return next();
});

/**
 * Base procedure — all procedures inherit CSRF/origin validation.
 */
const baseProcedure = t.procedure.use(validateOrigin);

/**
 * Export reusable router and procedure helpers
 */
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const publicProcedure = baseProcedure;

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
export const protectedProcedure = baseProcedure.use(isAuthed);

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
export const adminProcedure = baseProcedure.use(isAdmin);

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
  baseProcedure.use(isOrgMember(requiredRole));

// ─── Auth Rate Limiting ─────────────────────────────────────────────────
// In-memory sliding-window rate limiter for authentication endpoints.
// Limits to 5 attempts per IP per 15-minute window.
// TODO(Phase 1): Replace with Redis-backed rate limiting for multi-instance deployments.
const authRateLimitStore = new Map<string, { count: number; resetAt: number }>();
const AUTH_RATE_LIMIT_MAX = 5;
const AUTH_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

const authRateLimit = t.middleware(({ ctx, next }) => {
  const forwarded = ctx.req.headers["x-forwarded-for"];
  const ip =
    (typeof forwarded === "string" ? forwarded.split(",")[0]!.trim() : undefined) ||
    ctx.req.ip ||
    "unknown";
  const now = Date.now();
  const entry = authRateLimitStore.get(ip);

  if (entry && now < entry.resetAt) {
    if (entry.count >= AUTH_RATE_LIMIT_MAX) {
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many authentication attempts. Please try again later.",
      });
    }
    entry.count++;
  } else {
    authRateLimitStore.set(ip, { count: 1, resetAt: now + AUTH_RATE_LIMIT_WINDOW_MS });
  }

  // Periodic cleanup of expired entries to prevent memory leak
  if (authRateLimitStore.size > 10_000) {
    for (const [key, val] of authRateLimitStore) {
      if (now >= val.resetAt) authRateLimitStore.delete(key);
    }
  }

  return next();
});

/**
 * Auth procedure — public + rate-limited. Use for login/register endpoints.
 */
export const authProcedure = baseProcedure.use(authRateLimit);

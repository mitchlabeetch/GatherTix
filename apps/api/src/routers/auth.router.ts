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
import { router, authProcedure, protectedProcedure } from "../trpc/trpc";
import { lucia } from "../lib/auth";
import { hashPassword, verifyPassword } from "../lib/password";
import { loginSchema, registerSchema } from "@ticketing/shared/validations";

export const authRouter = router({
  /**
   * Get current session user
   */
  me: protectedProcedure.query(async ({ ctx }) => {
    const organizations = await ctx.prisma.organizationMember.findMany({
      where: { userId: ctx.user.id },
      include: {
        organization: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    return {
      id: ctx.user.id,
      email: ctx.user.email,
      firstName: ctx.user.firstName,
      lastName: ctx.user.lastName,
      role: ctx.user.role,
      avatar: ctx.user.avatar,
      organizations: organizations.map((org) => ({
        id: org.organization.id,
        name: org.organization.name,
        slug: org.organization.slug,
        role: org.role,
      })),
    };
  }),

  /**
   * Register a new user
   */
  register: authProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    const { email, password, firstName, lastName } = input;

    // Check if user already exists
    const existingUser = await ctx.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "An account with this email already exists",
      });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await ctx.prisma.user.create({
      data: {
        email,
        password: passwordHash,
        firstName,
        lastName,
      },
    });

    // Create session
    const session = await lucia.createSession(user.id, { created_at: new Date() });
    const sessionCookie = lucia.createSessionCookie(session.id);

    ctx.res.header("Set-Cookie", sessionCookie.serialize());

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }),

  /**
   * Login user
   */
  login: authProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input;

    // Find user
    const user = await ctx.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }

    // Verify password
    const validPassword = await verifyPassword(password, user.password);

    if (!validPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }

    // Update last login
    await ctx.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Create session
    const session = await lucia.createSession(user.id, { created_at: new Date() });
    const sessionCookie = lucia.createSessionCookie(session.id);

    ctx.res.header("Set-Cookie", sessionCookie.serialize());

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }),

  /**
   * Logout user
   */
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.session) {
      await lucia.invalidateSession(ctx.session.id);
    }

    const sessionCookie = lucia.createBlankSessionCookie();
    ctx.res.header("Set-Cookie", sessionCookie.serialize());

    return { success: true };
  }),

  /**
   * Change password
   */
  changePassword: protectedProcedure
    .input(
      z.object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z.string().min(8, "Password must be at least 8 characters"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { currentPassword, newPassword } = input;

      // Get user with password
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.user.id },
      });

      if (!user || !user.password) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }

      // Verify current password
      const validPassword = await verifyPassword(currentPassword, user.password);

      if (!validPassword) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Current password is incorrect",
        });
      }

      // Hash new password
      const newPasswordHash = await hashPassword(newPassword);

      // Update password
      await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: { password: newPasswordHash },
      });

      // Invalidate all sessions except current
      await lucia.invalidateUserSessions(ctx.user.id);
      const session = await lucia.createSession(ctx.user.id, { created_at: new Date() });
      const sessionCookie = lucia.createSessionCookie(session.id);
      ctx.res.header("Set-Cookie", sessionCookie.serialize());

      return { success: true };
    }),
});

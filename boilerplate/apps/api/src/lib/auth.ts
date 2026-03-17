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
import { Lucia, TimeSpan } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { prisma } from "@ticketing/database";
import { env } from "../config/env";

// Initialize Prisma adapter
const adapter = new PrismaAdapter(prisma.session, prisma.user);

// Initialize Lucia
export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    },
    name: "auth_session",
  },
  sessionExpiresIn: new TimeSpan(30, "d"), // 30 days
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      firstName: attributes.first_name,
      lastName: attributes.last_name,
      role: attributes.role,
      avatar: attributes.avatar,
      emailVerified: attributes.email_verified,
    };
  },
  getSessionAttributes: (attributes) => {
    return {
      createdAt: attributes.created_at,
    };
  },
});

// Extend Lucia types
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "USER" | "ADMIN";
  avatar: string | null;
  email_verified: boolean;
}

interface DatabaseSessionAttributes {
  created_at: Date;
}

// User type for context
export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
  avatar: string | null;
  emailVerified: boolean;
}

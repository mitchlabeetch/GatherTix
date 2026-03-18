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
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { prisma } from "@ticketing/database";
import { lucia, type AuthUser } from "../lib/auth";
import { logger } from "../config/logger";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  // Get session from cookie
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");

  let user: AuthUser | null = null;
  let session = null;

  if (sessionId) {
    const { session: validSession, user: sessionUser } = await lucia.validateSession(sessionId);

    if (validSession) {
      session = validSession;
      user = sessionUser as AuthUser;

      // Refresh session cookie if needed
      if (validSession.fresh) {
        res.header("Set-Cookie", lucia.createSessionCookie(validSession.id).serialize());
      }
    } else {
      // Invalid session, clear cookie
      res.header("Set-Cookie", lucia.createBlankSessionCookie().serialize());
    }
  }

  return {
    req,
    res,
    prisma,
    user,
    session,
    logger,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { prisma } from "@ticketing/database";
import { lucia } from "../lib/auth";
import { logger } from "../config/logger";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  // Get session from cookie
  const sessionId = lucia.readSessionCookie(req.headers.cookie ?? "");
  
  let user = null;
  let session = null;

  if (sessionId) {
    const { session: validSession, user: sessionUser } = await lucia.validateSession(sessionId);
    
    if (validSession) {
      session = validSession;
      user = sessionUser;
      
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

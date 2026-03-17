import { router } from "../trpc/trpc";
import { authRouter } from "./auth.router";
import { orgRouter } from "./org.router";
import { eventRouter } from "./event.router";
import { ticketRouter } from "./ticket.router";
import { orderRouter } from "./order.router";
import { userRouter } from "./user.router";

export const appRouter = router({
  auth: authRouter,
  org: orgRouter,
  event: eventRouter,
  ticket: ticketRouter,
  order: orderRouter,
  user: userRouter,
});

// Export type definition for the API
export type AppRouter = typeof appRouter;

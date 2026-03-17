import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@ticketing/api/routers";

export const trpc = createTRPCReact<AppRouter>();

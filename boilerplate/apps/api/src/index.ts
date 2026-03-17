import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import sensible from "@fastify/sensible";
import compress from "@fastify/compress";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "./routers";
import { createContext } from "./trpc/context";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { errorHandler } from "./middleware/error-handler";

async function main() {
  const app = Fastify({
    logger: logger as unknown as Fastify.FastifyLoggerInstance,
  });

  // Register plugins
  await app.register(compress);
  await app.register(helmet);
  await app.register(cors, {
    origin: env.CORS_ORIGIN.split(","),
    credentials: true,
  });

  // Rate limiting
  await app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
    redis: env.REDIS_URL ? new (await import("ioredis")).default(env.REDIS_URL) : undefined,
  });

  await app.register(sensible);

  // Swagger documentation
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Ticketing Platform API",
        description: "API documentation for the Ticketing Platform",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${env.PORT}`,
        },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
    },
  });

  // Health check endpoint
  app.get("/health", async () => {
    return {
      status: "healthy",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };
  });

  // tRPC router
  await app.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
      router: appRouter,
      createContext,
      onError: ({ path, error }) => {
        logger.error({ path, error }, "tRPC error");
      },
    },
  });

  // Error handler
  app.setErrorHandler(errorHandler);

  // Start server
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    logger.info(`🚀 Server running on http://localhost:${env.PORT}`);
    logger.info(`📚 API docs available at http://localhost:${env.PORT}/docs`);
  } catch (err) {
    logger.error(err, "Failed to start server");
    process.exit(1);
  }
}

main();

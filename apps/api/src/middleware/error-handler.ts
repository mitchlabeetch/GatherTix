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
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { TRPCError } from "@trpc/server";
import { logger } from "../config/logger";

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
): void {
  const requestId = request.id as string;
  const timestamp = new Date().toISOString();

  // Log the error
  logger.error(
    {
      err: error,
      requestId,
      path: request.url,
      method: request.method,
    },
    "Request error"
  );

  // Handle tRPC errors
  if (error instanceof TRPCError) {
    const statusCode = getTRPCErrorStatusCode(error.code);
    const response: ErrorResponse = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
      meta: { timestamp, requestId },
    };
    reply.status(statusCode).send(response);
    return;
  }

  // Handle validation errors
  if (error.validation) {
    const response: ErrorResponse = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: { [error.validation[0].dataPath]: [error.message || "Invalid value"] },
      },
      meta: { timestamp, requestId },
    };
    reply.status(400).send(response);
    return;
  }

  // Default error response
  const statusCode = error.statusCode || 500;
  const response: ErrorResponse = {
    success: false,
    error: {
      code: error.code || "INTERNAL_SERVER_ERROR",
      message:
        process.env.NODE_ENV === "production"
          ? "An unexpected error occurred"
          : error.message || "Internal server error",
    },
    meta: { timestamp, requestId },
  };

  reply.status(statusCode).send(response);
}

function getTRPCErrorStatusCode(code: string): number {
  switch (code) {
    case "BAD_REQUEST":
      return 400;
    case "UNAUTHORIZED":
      return 401;
    case "FORBIDDEN":
      return 403;
    case "NOT_FOUND":
      return 404;
    case "TIMEOUT":
      return 408;
    case "CONFLICT":
      return 409;
    case "PRECONDITION_FAILED":
      return 412;
    case "PAYLOAD_TOO_LARGE":
      return 413;
    case "METHOD_NOT_SUPPORTED":
      return 405;
    case "UNPROCESSABLE_CONTENT":
      return 422;
    case "TOO_MANY_REQUESTS":
      return 429;
    case "CLIENT_CLOSED_REQUEST":
      return 499;
    case "INTERNAL_SERVER_ERROR":
    default:
      return 500;
  }
}

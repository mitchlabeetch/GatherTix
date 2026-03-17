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
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const envSchema = z.object({
  // Server
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(3001),

  // Database
  DATABASE_URL: z.string(),

  // Redis
  REDIS_URL: z.string().optional(),

  // CORS
  CORS_ORIGIN: z.string().default("http://localhost:3000"),

  // Session
  SESSION_SECRET: z.string().min(32),

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),

  // Email (Resend)
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default("noreply@example.com"),
  EMAIL_FROM_NAME: z.string().default("Ticketing Platform"),

  // MinIO / S3
  S3_ENDPOINT: z.string().optional(),
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  S3_BUCKET: z.string().default("ticketing"),
  S3_REGION: z.string().default("us-east-1"),

  // App URLs
  APP_URL: z.string().default("http://localhost:3000"),
  API_URL: z.string().default("http://localhost:3001"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  parsedEnv.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  });
  process.exit(1);
}

export const env = parsedEnv.data;

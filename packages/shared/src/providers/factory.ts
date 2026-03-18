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

/**
 * Provider factory types.
 *
 * This module defines the configuration shape and provider container type
 * used by the runtime factory in `apps/api`. The actual instantiation logic
 * lives in the API app — this package only exports the contracts.
 */

import type { PaymentProvider } from "./payment.js";
import type { EmailProvider } from "./email.js";
import type { StorageProvider } from "./storage.js";

// ── Provider Name Unions ────────────────────────────────────────────────────

/** Supported payment provider identifiers. */
export type PaymentProviderName =
  | "stripe"
  | "paypal"
  | "mollie"
  | "zeffy"
  | "manual";

/** Supported email provider identifiers. */
export type EmailProviderName =
  | "smtp"
  | "resend"
  | "postal"
  | "ses"
  | "console";

/** Supported storage provider identifiers. */
export type StorageProviderName =
  | "minio"
  | "s3"
  | "local";

// ── Configuration ───────────────────────────────────────────────────────────

/**
 * Provider configuration read from environment variables.
 *
 * ```env
 * PAYMENT_PROVIDER=zeffy
 * EMAIL_PROVIDER=resend
 * STORAGE_PROVIDER=minio
 * ```
 */
export interface ProviderConfig {
  payment: PaymentProviderName;
  email: EmailProviderName;
  storage: StorageProviderName;
}

// ── Container ───────────────────────────────────────────────────────────────

/**
 * Holds the instantiated provider adapters.
 *
 * Created once at application startup via `createProviders(config)` in
 * `apps/api` and threaded through the request context.
 */
export interface ProviderContainer {
  payment: PaymentProvider;
  email: EmailProvider;
  storage: StorageProvider;
}

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
 * Payment provider interface.
 *
 * Every payment backend (Stripe, Zeffy, PayPal, Mollie, manual/free) must
 * implement this contract. The active provider is selected at startup via
 * the `PAYMENT_PROVIDER` environment variable.
 */

// ── Supporting Types ────────────────────────────────────────────────────────

/** Data required to create a checkout session. */
export interface OrderData {
  /** Internal GatherTix order ID. */
  orderId: string;
  /** Total amount in the currency's smallest unit (e.g. cents). */
  amountCents: number;
  /** ISO 4217 currency code (default: "USD"). */
  currency: string;
  /** Customer email — pre-filled on hosted checkout pages when supported. */
  customerEmail?: string;
  /** Human-readable description (e.g. "2× VIP — Summer Fest 2025"). */
  description?: string;
  /** URL the customer returns to after successful payment. */
  successUrl: string;
  /** URL the customer returns to on cancellation. */
  cancelUrl: string;
  /** Arbitrary provider-specific options (e.g. Zeffy form ID). */
  metadata?: Record<string, string>;
}

/** Result of creating a checkout session. */
export interface CheckoutResult {
  /** URL to redirect the customer to (hosted checkout page). */
  checkoutUrl: string;
  /** Provider-assigned session/transaction ID, if available. */
  sessionId?: string;
  /** Echo of the GatherTix order ID for correlation. */
  orderId: string;
}

/** Normalised webhook event emitted after signature verification. */
export interface WebhookEvent {
  /** Provider-defined event type (e.g. "payment.completed", "charge.refunded"). */
  type: string;
  /** Provider-assigned transaction / payment ID. */
  paymentId: string;
  /** Our internal order ID, if the provider included it. */
  orderId?: string;
  /** Amount in the currency's smallest unit. */
  amountCents: number;
  /** ISO 4217 currency code. */
  currency: string;
  /** Normalised status. */
  status: "completed" | "failed" | "refunded" | "pending";
  /** Full provider-specific payload for audit logging. */
  raw: unknown;
}

/** Result of a refund request. */
export interface RefundResult {
  success: boolean;
  /** Provider-assigned refund ID. */
  refundId?: string;
  /** Amount actually refunded (smallest currency unit). */
  amountCents?: number;
  error?: {
    code: string;
    message: string;
  };
}

// ── Interface ───────────────────────────────────────────────────────────────

export interface PaymentProvider {
  /** Human-readable provider name (e.g. "stripe", "zeffy"). */
  readonly name: string;

  /**
   * Create a hosted checkout session for the given order.
   *
   * Returns a URL to redirect the customer to. The provider is responsible
   * for calling back via webhook once payment is confirmed.
   */
  createCheckoutSession(order: OrderData): Promise<CheckoutResult>;

  /**
   * Validate the webhook signature and parse the raw body into a
   * normalised {@link WebhookEvent}.
   *
   * @param payload  Raw request body buffer (do NOT pre-parse as JSON).
   * @param headers  Incoming HTTP headers (provider reads its signature header).
   */
  handleWebhook(
    payload: Buffer,
    headers: Record<string, string | string[] | undefined>,
  ): Promise<WebhookEvent>;

  /**
   * Issue a full or partial refund.
   *
   * @param paymentId   Provider-assigned payment / transaction ID.
   * @param amountCents Optional partial amount; omit for full refund.
   */
  createRefund(
    paymentId: string,
    amountCents?: number,
  ): Promise<RefundResult>;

  /**
   * Verify the cryptographic signature of an incoming webhook payload.
   *
   * This is intentionally separated from {@link handleWebhook} so callers
   * can perform a quick signature check without parsing.
   */
  verifySignature(payload: Buffer, signature: string): boolean;
}

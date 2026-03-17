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
 * Zeffy Payment Provider
 *
 * Zeffy (https://www.zeffy.com) covers 100% of platform fees for registered
 * non-profit organizations. This provider generates hosted checkout URLs for
 * Zeffy forms and processes incoming webhook callbacks to mark orders as complete.
 *
 * Environment variables required:
 *   ZEFFY_FORM_BASE_URL   - Base URL for Zeffy hosted checkout forms
 *                           (e.g. https://www.zeffy.com/en-US/ticketing/)
 *   ZEFFY_WEBHOOK_SECRET  - Shared secret used to validate Zeffy callback signatures
 */

import crypto from "node:crypto";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PaymentIntentOptions {
  /** Order ID in GatherTix (used as external reference on Zeffy) */
  orderId: string;
  /** Total amount in cents (e.g. 2500 = $25.00) */
  amountCents: number;
  /** ISO 4217 currency code (default: "USD") */
  currency?: string;
  /** Customer email address pre-filled on the Zeffy form */
  customerEmail?: string;
  /** Human-readable description shown on the Zeffy checkout page */
  description?: string;
  /** Zeffy form/fundraiser ID configured in the Zeffy dashboard */
  zeffyFormId: string;
  /** URL Zeffy redirects to after a successful payment */
  successUrl: string;
  /** URL Zeffy redirects to on cancellation */
  cancelUrl: string;
}

export interface PaymentIntent {
  /** URL to redirect the customer to for checkout */
  checkoutUrl: string;
  /** Zeffy form ID used for this transaction */
  formId: string;
  /** Our internal order reference */
  orderId: string;
}

export interface ZeffyWebhookPayload {
  /** Zeffy event type */
  event: string;
  /** Transaction / form submission data */
  data: {
    /** Zeffy's internal transaction ID */
    transactionId: string;
    /** Our external reference (orderId) set during form creation */
    externalReference?: string;
    /** Total amount in cents */
    amountCents: number;
    /** Currency code */
    currency: string;
    /** Payer email */
    email?: string;
    /** Status of the transaction */
    status: "completed" | "failed" | "refunded" | "pending";
  };
}

export interface WebhookValidationResult {
  valid: boolean;
  payload?: ZeffyWebhookPayload;
  error?: string;
}

// ── ZeffyPaymentProvider ──────────────────────────────────────────────────────

export class ZeffyPaymentProvider {
  private readonly formBaseUrl: string;
  private readonly webhookSecret: string;

  constructor(formBaseUrl: string, webhookSecret: string) {
    if (!formBaseUrl) {
      throw new Error("ZeffyPaymentProvider: formBaseUrl is required.");
    }
    if (!webhookSecret) {
      throw new Error("ZeffyPaymentProvider: webhookSecret is required.");
    }
    // Normalize trailing slash
    this.formBaseUrl = formBaseUrl.endsWith("/")
      ? formBaseUrl.slice(0, -1)
      : formBaseUrl;
    this.webhookSecret = webhookSecret;
  }

  /**
   * Generate a Zeffy hosted checkout URL.
   *
   * Zeffy does not have a traditional "create payment intent" server-side API.
   * Instead, organizers configure a Form in the Zeffy dashboard and customers
   * are redirected to `https://www.zeffy.com/en-US/ticketing/<formId>`.
   *
   * We append UTM-style query parameters so Zeffy callbacks can correlate
   * the transaction with our internal order ID.
   */
  createPaymentIntent(options: PaymentIntentOptions): PaymentIntent {
    const {
      orderId,
      amountCents,
      currency = "USD",
      customerEmail,
      description,
      zeffyFormId,
      successUrl,
      cancelUrl,
    } = options;

    if (!zeffyFormId) {
      throw new Error("ZeffyPaymentProvider: zeffyFormId is required.");
    }

    const params = new URLSearchParams({
      ref: orderId,
      amount: String(amountCents),
      currency,
      ...(customerEmail ? { email: customerEmail } : {}),
      ...(description ? { desc: description } : {}),
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    const checkoutUrl = `${this.formBaseUrl}/${zeffyFormId}?${params.toString()}`;

    return {
      checkoutUrl,
      formId: zeffyFormId,
      orderId,
    };
  }

  /**
   * Validate and parse an incoming Zeffy webhook callback.
   *
   * Zeffy signs webhook payloads using HMAC-SHA256. The signature is sent
   * in the `X-Zeffy-Signature` header as `sha256=<hex_digest>`.
   *
   * IMPORTANT: Call this method with the raw request body buffer — do NOT pass
   * a parsed JSON object, as signature verification operates on the raw bytes.
   */
  handleWebhook(
    rawBody: Buffer,
    signature: string
  ): WebhookValidationResult {
    if (!signature) {
      return { valid: false, error: "Missing X-Zeffy-Signature header." };
    }

    // Validate signature format
    const signatureParts = signature.split("=");
    if (signatureParts.length !== 2 || signatureParts[0] !== "sha256") {
      return {
        valid: false,
        error: "Invalid signature format; expected sha256=<hex>.",
      };
    }

    const receivedHex = signatureParts[1];

    // Compute expected HMAC-SHA256
    const expectedHex = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(rawBody)
      .digest("hex");

    // Constant-time comparison to prevent timing attacks
    const signaturesMatch = crypto.timingSafeEqual(
      Buffer.from(receivedHex, "hex"),
      Buffer.from(expectedHex, "hex")
    );

    if (!signaturesMatch) {
      return { valid: false, error: "Signature mismatch — webhook rejected." };
    }

    // Parse payload
    let payload: ZeffyWebhookPayload;
    try {
      payload = JSON.parse(rawBody.toString("utf8")) as ZeffyWebhookPayload;
    } catch {
      return { valid: false, error: "Failed to parse webhook JSON payload." };
    }

    return { valid: true, payload };
  }
}

// ── Factory ───────────────────────────────────────────────────────────────────

/**
 * Create a ZeffyPaymentProvider instance from environment variables.
 *
 * Required env vars:
 *   ZEFFY_FORM_BASE_URL   - Base URL for Zeffy hosted forms
 *   ZEFFY_WEBHOOK_SECRET  - Secret for validating Zeffy webhook signatures
 */
export function createZeffyProvider(): ZeffyPaymentProvider {
  const formBaseUrl = process.env.ZEFFY_FORM_BASE_URL;
  const webhookSecret = process.env.ZEFFY_WEBHOOK_SECRET;

  if (!formBaseUrl || !webhookSecret) {
    throw new Error(
      "ZeffyPaymentProvider: ZEFFY_FORM_BASE_URL and ZEFFY_WEBHOOK_SECRET environment variables must be set."
    );
  }

  return new ZeffyPaymentProvider(formBaseUrl, webhookSecret);
}

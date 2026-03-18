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

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import crypto from "node:crypto";
import {
  ZeffyPaymentProvider,
  createZeffyProvider,
} from "./zeffy-payment";

const TEST_SECRET = "test-webhook-secret-key-12345";
const TEST_BASE_URL = "https://www.zeffy.com/en-US/ticketing";

/** Compute the correct HMAC-SHA256 signature for a raw body buffer. */
function signPayload(body: Buffer, secret: string): string {
  return `sha256=${crypto.createHmac("sha256", secret).update(body).digest("hex")}`;
}

// ── ZeffyPaymentProvider ────────────────────────────────────────────────────

describe("ZeffyPaymentProvider", () => {
  let provider: ZeffyPaymentProvider;

  beforeEach(() => {
    provider = new ZeffyPaymentProvider(TEST_BASE_URL, TEST_SECRET);
  });

  // ── constructor ─────────────────────────────────────────────────────────

  describe("constructor", () => {
    it("creates instance with valid arguments", () => {
      expect(provider).toBeInstanceOf(ZeffyPaymentProvider);
    });

    it("throws when formBaseUrl is empty", () => {
      expect(() => new ZeffyPaymentProvider("", TEST_SECRET)).toThrow(
        "formBaseUrl is required"
      );
    });

    it("throws when webhookSecret is empty", () => {
      expect(() => new ZeffyPaymentProvider(TEST_BASE_URL, "")).toThrow(
        "webhookSecret is required"
      );
    });

    it("normalizes trailing slash on formBaseUrl", () => {
      const p = new ZeffyPaymentProvider(`${TEST_BASE_URL}/`, TEST_SECRET);
      const intent = p.createPaymentIntent({
        orderId: "ord_1",
        amountCents: 1000,
        zeffyFormId: "form_1",
        successUrl: "https://example.com/ok",
        cancelUrl: "https://example.com/cancel",
      });
      expect(intent.checkoutUrl).toContain("ticketing/form_1");
      expect(intent.checkoutUrl).not.toContain("ticketing//form_1");
    });
  });

  // ── createPaymentIntent ─────────────────────────────────────────────────

  describe("createPaymentIntent", () => {
    it("returns checkoutUrl, formId, and orderId", () => {
      const result = provider.createPaymentIntent({
        orderId: "ord_abc",
        amountCents: 2500,
        zeffyFormId: "frm_123",
        successUrl: "https://example.com/ok",
        cancelUrl: "https://example.com/cancel",
      });

      expect(result).toEqual(
        expect.objectContaining({
          formId: "frm_123",
          orderId: "ord_abc",
        })
      );
      expect(result.checkoutUrl).toContain(`${TEST_BASE_URL}/frm_123?`);
    });

    it("includes ref, amount, currency, success_url, cancel_url in query string", () => {
      const result = provider.createPaymentIntent({
        orderId: "ord_1",
        amountCents: 5000,
        currency: "CAD",
        zeffyFormId: "frm_1",
        successUrl: "https://example.com/ok",
        cancelUrl: "https://example.com/no",
      });

      const url = new URL(result.checkoutUrl);
      expect(url.searchParams.get("ref")).toBe("ord_1");
      expect(url.searchParams.get("amount")).toBe("5000");
      expect(url.searchParams.get("currency")).toBe("CAD");
      expect(url.searchParams.get("success_url")).toBe("https://example.com/ok");
      expect(url.searchParams.get("cancel_url")).toBe("https://example.com/no");
    });

    it("defaults currency to USD", () => {
      const result = provider.createPaymentIntent({
        orderId: "ord_2",
        amountCents: 1000,
        zeffyFormId: "frm_2",
        successUrl: "https://example.com/ok",
        cancelUrl: "https://example.com/no",
      });

      const url = new URL(result.checkoutUrl);
      expect(url.searchParams.get("currency")).toBe("USD");
    });

    it("includes optional email and description when provided", () => {
      const result = provider.createPaymentIntent({
        orderId: "ord_3",
        amountCents: 3000,
        zeffyFormId: "frm_3",
        customerEmail: "donor@example.org",
        description: "Gala Dinner",
        successUrl: "https://example.com/ok",
        cancelUrl: "https://example.com/no",
      });

      const url = new URL(result.checkoutUrl);
      expect(url.searchParams.get("email")).toBe("donor@example.org");
      expect(url.searchParams.get("desc")).toBe("Gala Dinner");
    });

    it("omits email and desc params when not provided", () => {
      const result = provider.createPaymentIntent({
        orderId: "ord_4",
        amountCents: 1000,
        zeffyFormId: "frm_4",
        successUrl: "https://example.com/ok",
        cancelUrl: "https://example.com/no",
      });

      const url = new URL(result.checkoutUrl);
      expect(url.searchParams.has("email")).toBe(false);
      expect(url.searchParams.has("desc")).toBe(false);
    });

    it("throws when zeffyFormId is empty", () => {
      expect(() =>
        provider.createPaymentIntent({
          orderId: "ord_5",
          amountCents: 1000,
          zeffyFormId: "",
          successUrl: "https://example.com/ok",
          cancelUrl: "https://example.com/no",
        })
      ).toThrow("zeffyFormId is required");
    });
  });

  // ── handleWebhook ───────────────────────────────────────────────────────

  describe("handleWebhook", () => {
    const validPayload = {
      event: "payment.completed",
      data: {
        transactionId: "txn_001",
        externalReference: "ord_abc",
        amountCents: 2500,
        currency: "USD",
        email: "user@example.com",
        status: "completed" as const,
      },
    };

    function makeSignedRequest(payload: object, secret = TEST_SECRET) {
      const body = Buffer.from(JSON.stringify(payload));
      return { body, signature: signPayload(body, secret) };
    }

    it("returns valid=true with parsed payload for a correctly signed request", () => {
      const { body, signature } = makeSignedRequest(validPayload);
      const result = provider.handleWebhook(body, signature);

      expect(result.valid).toBe(true);
      expect(result.payload).toEqual(validPayload);
      expect(result.error).toBeUndefined();
    });

    it("returns valid=false when signature header is missing (empty string)", () => {
      const body = Buffer.from(JSON.stringify(validPayload));
      const result = provider.handleWebhook(body, "");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("Missing X-Zeffy-Signature header.");
    });

    it("returns valid=false for invalid signature format (no sha256= prefix)", () => {
      const body = Buffer.from(JSON.stringify(validPayload));
      const result = provider.handleWebhook(
        body,
        "md5=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890"
      );

      expect(result.valid).toBe(false);
      expect(result.error).toBe("Invalid signature format; expected sha256=<hex>.");
    });

    it("returns valid=false for odd-length hex string", () => {
      const body = Buffer.from(JSON.stringify(validPayload));
      const result = provider.handleWebhook(body, "sha256=abc");

      expect(result.valid).toBe(false);
      expect(result.error).toBe(
        "Invalid signature format; hex string must have an even length."
      );
    });

    it("returns valid=false when hex length mismatches expected SHA-256 digest", () => {
      const body = Buffer.from(JSON.stringify(validPayload));
      // Valid even-length hex, but not 64 chars (SHA-256 output)
      const result = provider.handleWebhook(body, "sha256=abcd");

      expect(result.valid).toBe(false);
      expect(result.error).toBe("Signature mismatch — webhook rejected.");
    });

    it("returns valid=false when signature was computed with a different secret", () => {
      const { body } = makeSignedRequest(validPayload);
      const wrongSignature = signPayload(body, "wrong-secret");
      const result = provider.handleWebhook(body, wrongSignature);

      expect(result.valid).toBe(false);
      expect(result.error).toBe("Signature mismatch — webhook rejected.");
    });

    it("returns valid=false when body is not valid JSON (signature is correct for the raw bytes)", () => {
      const invalidJson = Buffer.from("{not-valid-json!!!");
      const signature = signPayload(invalidJson, TEST_SECRET);
      const result = provider.handleWebhook(invalidJson, signature);

      expect(result.valid).toBe(false);
      expect(result.error).toBe("Failed to parse webhook JSON payload.");
    });
  });
});

// ── createZeffyProvider factory ───────────────────────────────────────────

describe("createZeffyProvider", () => {
  const savedFormUrl = process.env.ZEFFY_FORM_BASE_URL;
  const savedSecret = process.env.ZEFFY_WEBHOOK_SECRET;

  beforeEach(() => {
    delete process.env.ZEFFY_FORM_BASE_URL;
    delete process.env.ZEFFY_WEBHOOK_SECRET;
  });

  afterEach(() => {
    if (savedFormUrl !== undefined) {
      process.env.ZEFFY_FORM_BASE_URL = savedFormUrl;
    } else {
      delete process.env.ZEFFY_FORM_BASE_URL;
    }
    if (savedSecret !== undefined) {
      process.env.ZEFFY_WEBHOOK_SECRET = savedSecret;
    } else {
      delete process.env.ZEFFY_WEBHOOK_SECRET;
    }
  });

  it("creates a ZeffyPaymentProvider when both env vars are set", () => {
    process.env.ZEFFY_FORM_BASE_URL = TEST_BASE_URL;
    process.env.ZEFFY_WEBHOOK_SECRET = TEST_SECRET;

    const instance = createZeffyProvider();
    expect(instance).toBeInstanceOf(ZeffyPaymentProvider);
  });

  it("throws when ZEFFY_FORM_BASE_URL is missing", () => {
    process.env.ZEFFY_WEBHOOK_SECRET = TEST_SECRET;

    expect(() => createZeffyProvider()).toThrow(
      "ZEFFY_FORM_BASE_URL and ZEFFY_WEBHOOK_SECRET environment variables must be set"
    );
  });

  it("throws when ZEFFY_WEBHOOK_SECRET is missing", () => {
    process.env.ZEFFY_FORM_BASE_URL = TEST_BASE_URL;

    expect(() => createZeffyProvider()).toThrow(
      "ZEFFY_FORM_BASE_URL and ZEFFY_WEBHOOK_SECRET environment variables must be set"
    );
  });

  it("throws when both env vars are missing", () => {
    expect(() => createZeffyProvider()).toThrow(
      "ZEFFY_FORM_BASE_URL and ZEFFY_WEBHOOK_SECRET environment variables must be set"
    );
  });
});

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
 * Email provider interface.
 *
 * Every email backend (SMTP, Resend, SES, Postal) must implement this
 * contract. The active provider is selected at startup via the
 * `EMAIL_PROVIDER` environment variable.
 */

// ── Supporting Types ────────────────────────────────────────────────────────

/** A single email address with optional display name. */
export interface EmailAddress {
  email: string;
  name?: string;
}

/** An email attachment. */
export interface EmailAttachment {
  /** File name shown to the recipient. */
  filename: string;
  /** Raw file content. */
  content: Buffer;
  /** MIME type (e.g. "application/pdf"). */
  contentType: string;
}

/** Options for sending a single email. */
export interface EmailOptions {
  /** Sender — falls back to the configured default if omitted. */
  from?: EmailAddress;
  /** Primary recipients (at least one required). */
  to: EmailAddress[];
  /** CC recipients. */
  cc?: EmailAddress[];
  /** BCC recipients. */
  bcc?: EmailAddress[];
  /** Email subject line. */
  subject: string;
  /** Plain-text body. */
  text?: string;
  /** HTML body. */
  html?: string;
  /** Optional Reply-To address. */
  replyTo?: EmailAddress;
  /** File attachments. */
  attachments?: EmailAttachment[];
  /** Arbitrary key-value tags for analytics / tracking. */
  tags?: Record<string, string>;
}

/** Result of sending a single email. */
export interface EmailResult {
  success: boolean;
  /** Provider-assigned message ID. */
  messageId?: string;
  error?: {
    code: string;
    message: string;
  };
}

// ── Interface ───────────────────────────────────────────────────────────────

export interface EmailProvider {
  /** Human-readable provider name (e.g. "resend", "smtp"). */
  readonly name: string;

  /**
   * Send a single email.
   */
  send(options: EmailOptions): Promise<EmailResult>;

  /**
   * Send multiple emails in a single batch.
   *
   * Providers that support native batching (Resend, SES) should use their
   * batch API. Others may fall back to sequential {@link send} calls.
   */
  sendBatch(messages: EmailOptions[]): Promise<EmailResult[]>;
}

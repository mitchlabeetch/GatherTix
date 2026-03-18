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
 * OrderConfirmationEmail — Neo-Editorial order confirmation email template.
 *
 * Design constraints (cross-client compatible):
 *   - No external CSS — all styles inline
 *   - Paper (#F4F4F0) background, white content card with 2px solid black border
 *   - Impact Statement Block: Leaf Green (#059669) banner
 *   - Download button: Cobalt Blue (#2563EB), hard shadow offset
 *   - Footer: "Powered by GatherTix • Open Source Ticketing"
 *   - NO gradients, NO blur shadows, NO dark mode, NO terracotta
 *   - Uses <table role="presentation"> for Outlook/Gmail/Apple Mail compatibility
 */

import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
} from "@react-email/components";

interface OrderConfirmationEmailProps {
  customerName: string;
  orderNumber: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  /** Total as formatted string, e.g. "$25.00" */
  total: string;
  ticketCount: number;
  orderUrl: string;
  /** Organization name — shown in impact statement */
  organizationName?: string;
  /** Optional impact message, e.g. "Your purchase directly funds our community initiatives." */
  impactStatement?: string;
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  customerName,
  orderNumber,
  eventName,
  eventDate,
  eventLocation,
  total,
  ticketCount,
  orderUrl,
  organizationName = "our organization",
  impactStatement = "Your purchase directly funds our community initiatives.",
}) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>Order confirmed: {eventName} — Order #{orderNumber}</Preview>

      <Body style={styles.body}>
        <Container style={styles.outerContainer}>

          {/* ── Impact Statement Banner — Leaf Green ─────────────────────── */}
          <table
            role="presentation"
            cellPadding={0}
            cellSpacing={0}
            style={styles.impactTable}
          >
            <tbody>
              <tr>
                <td style={styles.impactCell}>
                  <p style={styles.impactText}>
                    💚 Thank you for supporting <strong>{organizationName}</strong>.{" "}
                    {impactStatement}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          {/* ── Main content card ─────────────────────────────────────────── */}
          <Section style={styles.card}>

            {/* Heading */}
            <h1 style={styles.heading}>Order Confirmed!</h1>

            <p style={styles.greeting}>Hi {customerName},</p>

            <p style={styles.bodyText}>
              Your order for <strong>{eventName}</strong> is confirmed. Your tickets are
              attached to this email — present the QR code at entry.
            </p>

            {/* ── Event details table ─────────────────────────────────────── */}
            <table
              role="presentation"
              cellPadding={0}
              cellSpacing={0}
              style={styles.detailsTable}
            >
              <tbody>
                <DetailRow label="Order #" value={orderNumber} />
                <DetailRow label="Event" value={eventName} />
                <DetailRow label="Date" value={eventDate} />
                <DetailRow label="Venue" value={eventLocation} />
                <DetailRow label="Tickets" value={String(ticketCount)} />
                <DetailRow label="Total" value={total} isTotal />
              </tbody>
            </table>

            {/* ── Download button — Cobalt Blue, hard shadow ──────────────── */}
            <table
              role="presentation"
              cellPadding={0}
              cellSpacing={0}
              style={styles.buttonTable}
            >
              <tbody>
                <tr>
                  <td style={styles.buttonCell}>
                    <Button href={orderUrl} style={styles.button}>
                      View &amp; Download Tickets
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>

            <Hr style={styles.hr} />

            <p style={styles.contactText}>
              Questions? Reply to this email and we&apos;ll be happy to help.
            </p>
          </Section>

          {/* ── Footer ────────────────────────────────────────────────────── */}
          <p style={styles.footer}>
            Powered by{" "}
            <a
              href="https://github.com/mitchlabeetch/GatherTix"
              style={styles.footerLink}
            >
              GatherTix
            </a>{" "}
            • Open Source Ticketing • AGPL-3.0
          </p>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

// ── Helper: detail row ────────────────────────────────────────────────────────

function DetailRow({
  label,
  value,
  isTotal = false,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
}) {
  return (
    <tr>
      <td style={{ ...styles.detailLabel, fontWeight: isTotal ? "700" : "600" }}>{label}</td>
      <td style={{ ...styles.detailValue, fontWeight: isTotal ? "700" : "400" }}>{value}</td>
    </tr>
  );
}

// ── Inline styles (cross-client compatible) ───────────────────────────────────

const styles = {
  body: {
    backgroundColor: "#F4F4F0",
    fontFamily: "'Plus Jakarta Sans', Arial, Helvetica, sans-serif",
    margin: "0",
    padding: "32px 16px",
  } as React.CSSProperties,

  outerContainer: {
    maxWidth: "600px",
    margin: "0 auto",
  } as React.CSSProperties,

  // Impact statement — Leaf Green banner
  impactTable: {
    width: "100%",
    marginBottom: "0",
  } as React.CSSProperties,

  impactCell: {
    backgroundColor: "#059669",
    border: "2px solid #111827",
    borderBottom: "0",
    padding: "14px 24px",
    borderRadius: "8px 8px 0 0",
  } as React.CSSProperties,

  impactText: {
    margin: "0",
    fontFamily: "'Plus Jakarta Sans', Arial, Helvetica, sans-serif",
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#FFFFFF",
  } as React.CSSProperties,

  // Main white card — 2px solid black border
  card: {
    backgroundColor: "#FFFFFF",
    border: "2px solid #111827",
    borderTop: "0",
    padding: "32px 32px 24px",
    borderRadius: "0 0 8px 8px",
    marginBottom: "24px",
  } as React.CSSProperties,

  heading: {
    fontFamily: "'Outfit', Georgia, serif",
    fontSize: "28px",
    fontWeight: "800",
    lineHeight: "1.1",
    color: "#111827",
    marginTop: "0",
    marginBottom: "20px",
    letterSpacing: "-0.025em",
  } as React.CSSProperties,

  greeting: {
    fontFamily: "'Plus Jakarta Sans', Arial, Helvetica, sans-serif",
    fontSize: "16px",
    color: "#111827",
    marginBottom: "8px",
  } as React.CSSProperties,

  bodyText: {
    fontFamily: "'Plus Jakarta Sans', Arial, Helvetica, sans-serif",
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#4B5563",
    marginBottom: "24px",
  } as React.CSSProperties,

  // Event details table
  detailsTable: {
    width: "100%",
    backgroundColor: "#F4F4F0",
    border: "1px solid #111827",
    marginBottom: "24px",
  } as React.CSSProperties,

  detailLabel: {
    fontFamily: "'Plus Jakarta Sans', Arial, Helvetica, sans-serif",
    fontSize: "12px",
    fontWeight: "600",
    color: "#4B5563",
    padding: "8px 16px",
    borderBottom: "1px solid #D1D5DB",
    width: "35%",
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  } as React.CSSProperties,

  detailValue: {
    fontFamily: "'Plus Jakarta Sans', Arial, Helvetica, sans-serif",
    fontSize: "14px",
    color: "#111827",
    padding: "8px 16px",
    borderBottom: "1px solid #D1D5DB",
  } as React.CSSProperties,

  // Button wrapper — centered
  buttonTable: {
    width: "100%",
    marginBottom: "24px",
  } as React.CSSProperties,

  buttonCell: {
    textAlign: "center",
  } as React.CSSProperties,

  // Cobalt Blue button — hard shadow, no blur
  button: {
    display: "inline-block",
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    fontFamily: "'Plus Jakarta Sans', Arial, Helvetica, sans-serif",
    fontSize: "15px",
    fontWeight: "700",
    textDecoration: "none",
    padding: "14px 32px",
    border: "1px solid #111827",
    borderRadius: "4px",
    boxShadow: "4px 4px 0px 0px #111827",
    letterSpacing: "0.025em",
  } as React.CSSProperties,

  hr: {
    borderTop: "1px solid #D1D5DB",
    borderBottom: "none",
    margin: "24px 0 20px",
  } as React.CSSProperties,

  contactText: {
    fontFamily: "'Plus Jakarta Sans', Arial, Helvetica, sans-serif",
    fontSize: "14px",
    color: "#4B5563",
    margin: "0",
  } as React.CSSProperties,

  // Footer
  footer: {
    fontFamily: "'Plus Jakarta Sans', Arial, Helvetica, sans-serif",
    fontSize: "12px",
    color: "#9CA3AF",
    textAlign: "center" as const,
    margin: "0",
  } as React.CSSProperties,

  footerLink: {
    color: "#2563EB",
    textDecoration: "none",
  } as React.CSSProperties,
};

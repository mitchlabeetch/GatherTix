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
 * TicketPDF — Brutalist PDF ticket template.
 *
 * Neo-Editorial design constraints:
 *   - Horizontal layout with 2pt solid black border and dashed vertical divider
 *   - Paper background (#F4F4F0), Cobalt Blue (#2563EB) for ticket type labels
 *   - Hard shadow offset (structural, not visual blur)
 *   - NO gradients, NO soft shadows, NO terracotta
 *   - Footer: "Powered by GatherTix • Open Source Ticketing"
 */

import * as React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// ── Neo-Editorial color palette ───────────────────────────────────────────────
const COLORS = {
  paper:      "#F4F4F0",  // Warm off-white background
  white:      "#FFFFFF",
  inkBase:    "#111827",  // Primary text / borders
  inkMuted:   "#4B5563",  // Secondary text / metadata
  inkFaint:   "#9CA3AF",  // Placeholder / disabled
  cobalt:     "#2563EB",  // Cobalt Blue — ticket type labels
  leafGreen:  "#059669",  // Leaf Green — impact statement
  borderSoft: "#D1D5DB",
};

interface TicketPDFProps {
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  attendeeName: string;
  ticketType: string;
  ticketNumber: string;
  orderNumber: string;
  qrCodeDataUrl: string;
  organizationName?: string;
  /** Optional impact message shown in the green banner, e.g. "Your ticket funded 2 hours of workshops" */
  impactStatement?: string;
}

export const TicketPDF: React.FC<TicketPDFProps> = ({
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  attendeeName,
  ticketType,
  ticketNumber,
  orderNumber,
  qrCodeDataUrl,
  organizationName,
  impactStatement,
}) => {
  return (
    <Document
      title={`${eventName} — Ticket`}
      author="GatherTix"
      creator="GatherTix Open Source Ticketing"
    >
      <Page size="A5" orientation="landscape" style={styles.page}>

        {/* ── Outer ticket border (2pt solid black) ───────────────────────── */}
        <View style={styles.ticketOuter}>

          {/* ── Left column: event & attendee info ──────────────────────── */}
          <View style={styles.leftColumn}>

            {/* Organization name — uppercase, muted */}
            {organizationName && (
              <Text style={styles.orgName}>{organizationName.toUpperCase()}</Text>
            )}

            {/* Ticket type label — Cobalt Blue chip */}
            <View style={styles.ticketTypeBadge}>
              <Text style={styles.ticketTypeBadgeText}>{ticketType.toUpperCase()}</Text>
            </View>

            {/* Event name — bold, tight */}
            <Text style={styles.eventName}>{eventName}</Text>

            {/* Date and time */}
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>DATE</Text>
              <Text style={styles.metaValue}>{eventDate}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>TIME</Text>
              <Text style={styles.metaValue}>{eventTime}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>VENUE</Text>
              <Text style={styles.metaValue}>{eventLocation}</Text>
            </View>

            {/* Attendee box — bordered, light paper background */}
            <View style={styles.attendeeBox}>
              <Text style={styles.attendeeLabel}>ATTENDEE</Text>
              <Text style={styles.attendeeName}>{attendeeName}</Text>
            </View>

            {/* Impact statement — green banner */}
            {impactStatement && (
              <View style={styles.impactBanner}>
                <Text style={styles.impactText}>💚 {impactStatement}</Text>
              </View>
            )}
          </View>

          {/* ── Dashed vertical divider ──────────────────────────────────── */}
          <View style={styles.divider} />

          {/* ── Right column: QR code + ticket ID ───────────────────────── */}
          <View style={styles.rightColumn}>

            {/* QR code — bordered */}
            <View style={styles.qrBorder}>
              <Image src={qrCodeDataUrl} style={styles.qrCode} />
            </View>

            {/* Valid for 1 entry */}
            <Text style={styles.validText}>VALID FOR 1 ENTRY</Text>

            {/* Ticket ID — Courier (monospace) */}
            <Text style={styles.ticketIdLabel}>TICKET ID</Text>
            <Text style={styles.ticketId}>{ticketNumber}</Text>

            {/* Order number */}
            <Text style={styles.orderLabel}>ORDER</Text>
            <Text style={styles.orderId}>{orderNumber}</Text>

            {/* Footer: "Powered by GatherTix" */}
            <Text style={styles.poweredBy}>Powered by GatherTix{"\n"}Open Source Ticketing</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default TicketPDF;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  page: {
    padding: 24,
    backgroundColor: COLORS.paper,
    fontFamily: "Helvetica",
  },

  // Outer container — 2pt solid black border
  ticketOuter: {
    flex: 1,
    flexDirection: "row",
    border: "2pt solid #111827",
    backgroundColor: COLORS.white,
  },

  // ── Left column ──────────────────────────────────────────────────────────
  leftColumn: {
    flex: 2,
    padding: 20,
    justifyContent: "flex-start",
  },

  orgName: {
    fontFamily: "Helvetica",
    fontSize: 7,
    color: COLORS.inkMuted,
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  ticketTypeBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.cobalt,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 8,
  },

  ticketTypeBadgeText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    color: COLORS.white,
    letterSpacing: 1,
  },

  eventName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 22,
    color: COLORS.inkBase,
    lineHeight: 1.1,
    marginBottom: 14,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 5,
    gap: 8,
  },

  metaLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 6,
    color: COLORS.inkMuted,
    letterSpacing: 1.5,
    width: 36,
  },

  metaValue: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: COLORS.inkBase,
    flex: 1,
  },

  // Attendee box — bordered, light gray bg
  attendeeBox: {
    marginTop: 10,
    padding: 8,
    backgroundColor: COLORS.paper,
    border: "1pt solid #D1D5DB",
  },

  attendeeLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 6,
    color: COLORS.inkMuted,
    letterSpacing: 1.5,
    marginBottom: 3,
  },

  attendeeName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    color: COLORS.inkBase,
  },

  // Impact statement banner
  impactBanner: {
    marginTop: 8,
    padding: 6,
    backgroundColor: COLORS.leafGreen,
  },

  impactText: {
    fontFamily: "Helvetica",
    fontSize: 7,
    color: COLORS.white,
    lineHeight: 1.4,
  },

  // ── Dashed vertical divider ───────────────────────────────────────────────
  divider: {
    width: 1,
    borderLeft: "1pt dashed #111827",
    marginVertical: 12,
  },

  // ── Right column ─────────────────────────────────────────────────────────
  rightColumn: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  // QR code border
  qrBorder: {
    border: "2pt solid #111827",
    padding: 4,
    marginBottom: 8,
  },

  qrCode: {
    width: 90,
    height: 90,
  },

  validText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7,
    color: COLORS.inkBase,
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: "center",
  },

  ticketIdLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 6,
    color: COLORS.inkMuted,
    letterSpacing: 1.5,
    marginBottom: 2,
    textAlign: "center",
  },

  // Courier monospace for ticket ID — classic ticket stub aesthetic
  ticketId: {
    fontFamily: "Courier-Bold",
    fontSize: 8,
    color: COLORS.inkBase,
    letterSpacing: 0.5,
    marginBottom: 8,
    textAlign: "center",
  },

  orderLabel: {
    fontFamily: "Helvetica-Bold",
    fontSize: 6,
    color: COLORS.inkMuted,
    letterSpacing: 1.5,
    marginBottom: 2,
    textAlign: "center",
  },

  orderId: {
    fontFamily: "Courier",
    fontSize: 7,
    color: COLORS.inkMuted,
    marginBottom: 10,
    textAlign: "center",
  },

  poweredBy: {
    fontFamily: "Helvetica",
    fontSize: 6,
    color: COLORS.inkFaint,
    textAlign: "center",
    lineHeight: 1.5,
    marginTop: "auto",
  },
});

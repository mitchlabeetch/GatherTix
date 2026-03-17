import * as React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Path } from "@react-pdf/renderer";

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
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {organizationName || "Event Ticket"}
          </Text>
        </View>

        {/* Main Ticket */}
        <View style={styles.ticketContainer}>
          {/* Event Info */}
          <View style={styles.eventSection}>
            <Text style={styles.eventName}>{eventName}</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{eventDate}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Time</Text>
                <Text style={styles.infoValue}>{eventTime}</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{eventLocation}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Attendee Info */}
          <View style={styles.attendeeSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Attendee</Text>
                <Text style={styles.infoValue}>{attendeeName}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Ticket Type</Text>
                <Text style={styles.infoValue}>{ticketType}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Ticket Number</Text>
                <Text style={styles.infoValueSmall}>{ticketNumber}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Order</Text>
                <Text style={styles.infoValueSmall}>{orderNumber}</Text>
              </View>
            </View>
          </View>

          {/* QR Code */}
          <View style={styles.qrSection}>
            <Image src={qrCodeDataUrl} style={styles.qrCode} />
            <Text style={styles.qrText}>Scan for entry</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Please present this ticket at the entrance. This ticket is valid for one entry only.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TicketPDF;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  header: {
    backgroundColor: "#000000",
    padding: 20,
    marginBottom: 30,
    borderRadius: 8,
  },
  headerText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  ticketContainer: {
    border: "2px dashed #d1d5db",
    borderRadius: 12,
    padding: 30,
    marginBottom: 30,
  },
  eventSection: {
    marginBottom: 20,
  },
  eventName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 20,
    textAlign: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  infoValueSmall: {
    fontSize: 11,
    color: "#4a4a4a",
  },
  divider: {
    borderBottom: "1px dashed #d1d5db",
    marginVertical: 20,
  },
  attendeeSection: {
    marginBottom: 20,
  },
  qrSection: {
    alignItems: "center",
    marginTop: 20,
  },
  qrCode: {
    width: 150,
    height: 150,
  },
  qrText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 10,
  },
  footer: {
    backgroundColor: "#f9fafb",
    padding: 15,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
  },
});

import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Row,
  Column,
} from "@react-email/components";

interface TicketEmailProps {
  attendeeName: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  ticketType: string;
  ticketNumber: string;
  orderNumber: string;
}

export const TicketEmail: React.FC<TicketEmailProps> = ({
  attendeeName,
  eventName,
  eventDate,
  eventTime,
  eventLocation,
  ticketType,
  ticketNumber,
  orderNumber,
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your ticket for {eventName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Your Ticket</Heading>
          
          <Text style={text}>Hi {attendeeName},</Text>
          
          <Text style={text}>
            Here is your ticket for <strong>{eventName}</strong>.
          </Text>

          <Section style={ticket}>
            <Text style={ticketHeader}>{eventName}</Text>
            
            <Row>
              <Column>
                <Text style={ticketLabel}>Date</Text>
                <Text style={ticketValue}>{eventDate}</Text>
              </Column>
              <Column>
                <Text style={ticketLabel}>Time</Text>
                <Text style={ticketValue}>{eventTime}</Text>
              </Column>
            </Row>
            
            <Text style={ticketLabel}>Location</Text>
            <Text style={ticketValue}>{eventLocation}</Text>
            
            <Hr style={ticketDivider} />
            
            <Row>
              <Column>
                <Text style={ticketLabel}>Ticket Type</Text>
                <Text style={ticketValue}>{ticketType}</Text>
              </Column>
              <Column>
                <Text style={ticketLabel}>Ticket #</Text>
                <Text style={ticketValue}>{ticketNumber}</Text>
              </Column>
            </Row>
            
            <Text style={orderNumber}>Order: {orderNumber}</Text>
          </Section>

          <Text style={text}>
            Please present this ticket (printed or on your phone) at the entrance.
            The QR code on your PDF ticket will be scanned for entry.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Questions? Contact the event organizer.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default TicketEmail;

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const heading = {
  fontSize: "32px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
  color: "#1a1a1a",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4a4a4a",
  padding: "0 24px",
};

const ticket = {
  backgroundColor: "#f9fafb",
  border: "2px dashed #d1d5db",
  borderRadius: "12px",
  padding: "24px",
  margin: "24px",
};

const ticketHeader = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1a1a1a",
  marginBottom: "16px",
  textAlign: "center" as const,
};

const ticketLabel = {
  fontSize: "12px",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  marginBottom: "4px",
};

const ticketValue = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1a1a1a",
  marginBottom: "12px",
};

const ticketDivider = {
  borderColor: "#e5e7eb",
  margin: "16px 0",
  borderStyle: "dashed",
};

const orderNumber = {
  fontSize: "12px",
  color: "#6b7280",
  textAlign: "center" as const,
  marginTop: "16px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  fontSize: "12px",
  lineHeight: "16px",
  color: "#8898aa",
  textAlign: "center" as const,
  padding: "0 24px",
};

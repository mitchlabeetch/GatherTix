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
  Button,
  Hr,
} from "@react-email/components";

interface OrderConfirmationEmailProps {
  customerName: string;
  orderNumber: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  total: string;
  ticketCount: number;
  orderUrl: string;
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
}) => {
  return (
    <Html>
      <Head />
      <Preview>Your order confirmation for {eventName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Thank you for your order!</Heading>
          
          <Text style={text}>Hi {customerName},</Text>
          
          <Text style={text}>
            Your order for <strong>{eventName}</strong> has been confirmed.
          </Text>

          <Section style={details}>
            <Text style={detailItem}>
              <strong>Order Number:</strong> {orderNumber}
            </Text>
            <Text style={detailItem}>
              <strong>Event:</strong> {eventName}
            </Text>
            <Text style={detailItem}>
              <strong>Date:</strong> {eventDate}
            </Text>
            <Text style={detailItem}>
              <strong>Location:</strong> {eventLocation}
            </Text>
            <Text style={detailItem}>
              <strong>Tickets:</strong> {ticketCount}
            </Text>
            <Text style={detailItem}>
              <strong>Total:</strong> {total}
            </Text>
          </Section>

          <Text style={text}>
            Your tickets are attached to this email. You can also view and download them
            from your order page.
          </Text>

          <Button style={button} href={orderUrl}>
            View Order
          </Button>

          <Hr style={hr} />

          <Text style={footer}>
            If you have any questions, please contact the event organizer.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

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

const details = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "20px 24px",
  margin: "24px",
};

const detailItem = {
  fontSize: "14px",
  lineHeight: "24px",
  margin: "8px 0",
  color: "#4a4a4a",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "200px",
  margin: "24px auto",
  padding: "12px",
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

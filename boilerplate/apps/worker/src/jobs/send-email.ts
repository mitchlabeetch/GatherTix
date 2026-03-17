import { Job } from "bullmq";
import { render } from "@react-email/render";
import { resend, sendEmail } from "@ticketing/email";
import { OrderConfirmationEmail } from "@ticketing/email/templates/order-confirmation";
import { TicketEmail } from "@ticketing/email/templates/ticket-email";
import { logger } from "../lib/logger";

interface SendEmailJobData {
  type: "order_confirmation" | "ticket" | "event_reminder";
  to: string;
  payload: Record<string, unknown>;
}

export async function processSendEmail(job: Job<SendEmailJobData>): Promise<void> {
  const { type, to, payload } = job.data;

  logger.info({ jobId: job.id, type, to }, "Processing email job");

  try {
    let html: string;
    let subject: string;

    switch (type) {
      case "order_confirmation": {
        const orderPayload = payload as {
          customerName: string;
          orderNumber: string;
          eventName: string;
          eventDate: string;
          eventLocation: string;
          total: string;
          ticketCount: number;
          orderUrl: string;
        };
        html = await render(OrderConfirmationEmail(orderPayload));
        subject = `Your order confirmation - ${orderPayload.eventName}`;
        break;
      }

      case "ticket": {
        const ticketPayload = payload as {
          attendeeName: string;
          eventName: string;
          eventDate: string;
          eventTime: string;
          eventLocation: string;
          ticketType: string;
          ticketNumber: string;
          orderNumber: string;
        };
        html = await render(TicketEmail(ticketPayload));
        subject = `Your ticket for ${ticketPayload.eventName}`;
        break;
      }

      default:
        throw new Error(`Unknown email type: ${type}`);
    }

    const result = await sendEmail({
      to,
      subject,
      html,
    });

    if (!result.success) {
      throw new Error(result.error || "Failed to send email");
    }

    logger.info({ jobId: job.id }, "Email sent successfully");
  } catch (error) {
    logger.error({ jobId: job.id, error }, "Failed to send email");
    throw error;
  }
}

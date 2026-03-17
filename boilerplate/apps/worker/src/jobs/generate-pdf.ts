import { Job } from "bullmq";
import { renderToBuffer } from "@react-pdf/renderer";
import * as QRCode from "qrcode";
import { TicketPDF } from "@ticketing/pdf/templates/ticket-pdf";
import { prisma } from "@ticketing/database";
import { logger } from "../lib/logger";

interface GeneratePDFJobData {
  type: "ticket";
  ticketId: string;
}

export async function processGeneratePDF(job: Job<GeneratePDFJobData>): Promise<void> {
  const { type, ticketId } = job.data;

  logger.info({ jobId: job.id, type, ticketId }, "Processing PDF generation job");

  try {
    // Get ticket details
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: {
        event: true,
        ticketType: true,
        order: true,
      },
    });

    if (!ticket) {
      throw new Error(`Ticket not found: ${ticketId}`);
    }

    // Generate QR code
    const qrCodeDataUrl = await QRCode.toDataURL(ticket.qrToken, {
      width: 300,
      margin: 2,
    });

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      TicketPDF({
        eventName: ticket.event.title,
        eventDate: ticket.event.startDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        eventTime: ticket.event.startDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        eventLocation: ticket.event.venueName || "TBA",
        attendeeName: ticket.attendeeName,
        ticketType: ticket.ticketType.name,
        ticketNumber: ticket.ticketNumber,
        orderNumber: ticket.order.orderNumber,
        qrCodeDataUrl,
      })
    );

    // TODO: Upload PDF to S3/MinIO and update ticket with URL
    // For now, just log success
    logger.info({ jobId: job.id, ticketId }, "PDF generated successfully");

    // Update ticket with PDF URL (placeholder)
    // await prisma.ticket.update({
    //   where: { id: ticketId },
    //   data: { pdfUrl: uploadedUrl },
    // });
  } catch (error) {
    logger.error({ jobId: job.id, error }, "Failed to generate PDF");
    throw error;
  }
}

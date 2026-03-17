import { Resend } from "resend";

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Email service
export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn("Resend not configured, email not sent");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const from = options.from || process.env.EMAIL_FROM || "noreply@example.com";
    const fromName = process.env.EMAIL_FROM_NAME || "Ticketing Platform";

    await resend.emails.send({
      from: `${fromName} <${from}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      reply_to: options.replyTo,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: String(error) };
  }
}

// Re-export templates
export * from "./templates/order-confirmation";
export * from "./templates/ticket-email";

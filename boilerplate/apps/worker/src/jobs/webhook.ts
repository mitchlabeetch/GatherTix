import { Job } from "bullmq";
import { prisma } from "@ticketing/database";
import { logger } from "../lib/logger";

interface WebhookJobData {
  webhookId: string;
  event: string;
  payload: Record<string, unknown>;
}

export async function processWebhook(job: Job<WebhookJobData>): Promise<void> {
  const { webhookId, event, payload } = job.data;

  logger.info({ jobId: job.id, webhookId, event }, "Processing webhook job");

  try {
    // Get webhook details
    const webhook = await prisma.webhook.findUnique({
      where: { id: webhookId },
    });

    if (!webhook) {
      throw new Error(`Webhook not found: ${webhookId}`);
    }

    if (!webhook.isActive) {
      logger.info({ jobId: job.id, webhookId }, "Webhook is inactive, skipping");
      return;
    }

    // Check if webhook is subscribed to this event
    if (!webhook.events.includes(event)) {
      logger.info({ jobId: job.id, webhookId, event }, "Webhook not subscribed to event, skipping");
      return;
    }

    // Create delivery record
    const delivery = await prisma.webhookDelivery.create({
      data: {
        webhookId,
        event: event as any,
        payload,
        status: "PENDING",
      },
    });

    // Send webhook
    const response = await fetch(webhook.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Webhook-Signature": generateSignature(payload, webhook.secret),
        "X-Webhook-Event": event,
        "X-Webhook-Delivery": delivery.id,
      },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        data: payload,
      }),
    });

    // Update delivery record
    await prisma.webhookDelivery.update({
      where: { id: delivery.id },
      data: {
        status: response.ok ? "DELIVERED" : "FAILED",
        responseStatus: response.status,
        responseBody: await response.text(),
        completedAt: new Date(),
      },
    });

    if (!response.ok) {
      throw new Error(`Webhook delivery failed: ${response.status} ${response.statusText}`);
    }

    logger.info({ jobId: job.id, webhookId, deliveryId: delivery.id }, "Webhook delivered successfully");
  } catch (error) {
    logger.error({ jobId: job.id, error }, "Failed to process webhook");
    throw error;
  }
}

function generateSignature(payload: Record<string, unknown>, secret: string): string {
  // Simple HMAC signature (in production, use a proper crypto library)
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(JSON.stringify(payload));
  return `sha256=${hmac.digest("hex")}`;
}

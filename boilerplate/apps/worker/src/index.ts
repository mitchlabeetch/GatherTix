import { Worker, Queue, QueueEvents } from "bullmq";
import IORedis from "ioredis";
import dotenv from "dotenv";
import { logger } from "./lib/logger";
import { processSendEmail } from "./jobs/send-email";
import { processGeneratePDF } from "./jobs/generate-pdf";
import { processWebhook } from "./jobs/webhook";

// Load environment variables
dotenv.config();

// Redis connection
const redisConnection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

// Define queues
export const emailQueue = new Queue("email", { connection: redisConnection });
export const pdfQueue = new Queue("pdf", { connection: redisConnection });
export const webhookQueue = new Queue("webhook", { connection: redisConnection });

// Define workers
const emailWorker = new Worker("email", processSendEmail, {
  connection: redisConnection,
  concurrency: 5,
});

const pdfWorker = new Worker("pdf", processGeneratePDF, {
  connection: redisConnection,
  concurrency: 3,
});

const webhookWorker = new Worker("webhook", processWebhook, {
  connection: redisConnection,
  concurrency: 10,
});

// Worker event handlers
emailWorker.on("completed", (job) => {
  logger.info(`Email job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, error: err }, "Email job failed");
});

pdfWorker.on("completed", (job) => {
  logger.info(`PDF job ${job.id} completed`);
});

pdfWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, error: err }, "PDF job failed");
});

webhookWorker.on("completed", (job) => {
  logger.info(`Webhook job ${job.id} completed`);
});

webhookWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, error: err }, "Webhook job failed");
});

// Graceful shutdown
async function shutdown() {
  logger.info("Shutting down workers...");

  await emailWorker.close();
  await pdfWorker.close();
  await webhookWorker.close();

  await emailQueue.close();
  await pdfQueue.close();
  await webhookQueue.close();

  await redisConnection.quit();

  logger.info("Workers shut down successfully");
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

logger.info("Workers started successfully");
logger.info("Listening for jobs...");

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
 * Application-wide constants
 */

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Session
export const SESSION_COOKIE_NAME = "auth_session";
export const SESSION_EXPIRY_DAYS = 30;

// Rate limiting
export const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
export const RATE_LIMIT_MAX_REQUESTS = 100;

// Order expiry
export const ORDER_EXPIRY_MINUTES = 15;

// Ticket QR code
export const QR_TOKEN_LENGTH = 32;

// File uploads
export const MAX_FILE_SIZE_MB = 10;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Currency defaults
export const DEFAULT_CURRENCY = "USD";
export const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"] as const;

// Event statuses that allow ticket sales
export const EVENT_SALES_STATUSES = ["PUBLISHED"];

// Payment providers
export const PAYMENT_PROVIDERS = ["STRIPE", "PAYPAL", "MOLLIE", "ZEFFY", "MANUAL"] as const;

// Email providers
export const EMAIL_PROVIDERS = ["SMTP", "RESEND", "POSTAL", "SES", "CONSOLE"] as const;

// Storage providers
export const STORAGE_PROVIDERS = ["MINIO", "S3", "LOCAL"] as const;

// Order statuses that allow refunds
export const REFUNDABLE_ORDER_STATUSES = ["COMPLETED"];

// User roles hierarchy (higher index = more permissions)
export const USER_ROLE_HIERARCHY = ["USER", "ADMIN"] as const;

// Organization member roles hierarchy
export const ORG_MEMBER_ROLE_HIERARCHY = ["MEMBER", "ADMIN", "OWNER"] as const;

// Webhook retry delays in minutes
export const WEBHOOK_RETRY_DELAYS = [1, 5, 15];

// API key prefix length
export const API_KEY_PREFIX_LENGTH = 8;

// Cache TTLs (in seconds)
export const CACHE_TTL = {
  EVENT: 300, // 5 minutes
  TICKET_AVAILABILITY: 60, // 1 minute
  USER_SESSION: 3600, // 1 hour
  ORGANIZATION: 600, // 10 minutes
} as const;

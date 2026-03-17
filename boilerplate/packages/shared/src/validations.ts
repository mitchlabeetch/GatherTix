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
 * Shared Zod validation schemas
 */

import { z } from "zod";

// ============================================
// Common Validations
// ============================================

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password must be less than 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const nameSchema = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .regex(/^[a-zA-Z\s\-']+$/, "Name contains invalid characters");

export const slugSchema = z
  .string()
  .min(1, "Slug is required")
  .max(100, "Slug must be less than 100 characters")
  .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens");

export const urlSchema = z
  .string()
  .url("Invalid URL")
  .optional()
  .or(z.literal(""));

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s-()]+$/, "Invalid phone number")
  .optional()
  .or(z.literal(""));

// ============================================
// User Validations
// ============================================

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    firstName: nameSchema,
    lastName: nameSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  firstName: nameSchema.optional(),
  lastName: nameSchema.optional(),
  avatar: urlSchema,
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordSchema,
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

// ============================================
// Organization Validations
// ============================================

export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required").max(100),
  slug: slugSchema,
  description: z.string().max(500).optional(),
  website: urlSchema,
  email: emailSchema.optional().or(z.literal("")),
  phone: phoneSchema,
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
});

export const updateOrganizationSchema = createOrganizationSchema.partial();

// ============================================
// Event Validations
// ============================================

export const createEventSchema = z.object({
  title: z.string().min(1, "Event title is required").max(200),
  slug: slugSchema.optional(),
  description: z.string().max(5000).optional(),
  image: urlSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  timezone: z.string().default("UTC"),
  venueName: z.string().max(200).optional(),
  address: z.string().max(200).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  isVirtual: z.boolean().default(false),
  virtualUrl: urlSchema,
  maxAttendees: z.number().int().positive().optional(),
  isPublic: z.boolean().default(true),
});

export const updateEventSchema = createEventSchema.partial();

export const publishEventSchema = z.object({
  status: z.enum(["PUBLISHED", "DRAFT", "CANCELLED"]),
});

// ============================================
// Ticket Type Validations
// ============================================

export const createTicketTypeSchema = z.object({
  name: z.string().min(1, "Ticket type name is required").max(100),
  description: z.string().max(500).optional(),
  price: z.number().min(0, "Price cannot be negative"),
  currency: z.string().default("USD"),
  quantity: z.number().int().positive("Quantity must be positive"),
  minPerOrder: z.number().int().min(1).default(1),
  maxPerOrder: z.number().int().min(1).default(10),
  salesStart: z.coerce.date().optional(),
  salesEnd: z.coerce.date().optional(),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export const updateTicketTypeSchema = createTicketTypeSchema.partial();

// ============================================
// Order Validations
// ============================================

export const orderItemSchema = z.object({
  ticketTypeId: z.string().min(1, "Ticket type is required"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const createOrderSchema = z.object({
  eventId: z.string().min(1, "Event is required"),
  items: z.array(orderItemSchema).min(1, "At least one ticket is required"),
  customerEmail: emailSchema,
  customerName: z.string().max(200).optional(),
  customerPhone: phoneSchema,
});

export const updateAttendeeSchema = z.object({
  attendeeName: z.string().min(1, "Attendee name is required").max(200),
  attendeeEmail: emailSchema,
  attendeePhone: phoneSchema,
});

// ============================================
// Payment Validations
// ============================================

export const createPaymentIntentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
});

export const confirmPaymentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  paymentIntentId: z.string().min(1, "Payment intent ID is required"),
});

// ============================================
// Webhook Validations
// ============================================

export const createWebhookSchema = z.object({
  name: z.string().min(1, "Webhook name is required").max(100),
  url: z.string().url("Invalid URL"),
  events: z.array(z.string()).min(1, "At least one event is required"),
});

export const updateWebhookSchema = createWebhookSchema.partial();

// ============================================
// Template Validations
// ============================================

export const createTemplateSchema = z.object({
  name: z.string().min(1, "Template name is required").max(100),
  type: z.enum(["EMAIL_ORDER_CONFIRMATION", "EMAIL_TICKET", "EMAIL_EVENT_REMINDER", "PDF_TICKET"]),
  subject: z.string().max(200).optional(),
  content: z.string().min(1, "Content is required"),
  styles: z.record(z.unknown()).optional(),
  isDefault: z.boolean().default(false),
});

export const updateTemplateSchema = createTemplateSchema.partial();

// ============================================
// Type Exports
// ============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationInput = z.infer<typeof updateOrganizationSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type CreateTicketTypeInput = z.infer<typeof createTicketTypeSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreateWebhookInput = z.infer<typeof createWebhookSchema>;
export type CreateTemplateInput = z.infer<typeof createTemplateSchema>;

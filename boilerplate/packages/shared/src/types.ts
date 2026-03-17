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
 * Shared TypeScript types and interfaces
 */

import { z } from "zod";

// ============================================
// Base Types
// ============================================

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextCursor?: string;
  };
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FilterParams {
  search?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}

// ============================================
// API Response Types
// ============================================

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

// ============================================
// User Types
// ============================================

export interface UserSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
  organizations: {
    id: string;
    name: string;
    slug: string;
    role: "OWNER" | "ADMIN" | "MEMBER";
  }[];
}

// ============================================
// Event Types
// ============================================

export interface EventWithStats {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  image: string | null;
  startDate: Date;
  endDate: Date;
  timezone: string;
  venueName: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  isVirtual: boolean;
  virtualUrl: string | null;
  maxAttendees: number | null;
  isPublic: boolean;
  status: string;
  _count: {
    orders: number;
    tickets: number;
  };
  ticketTypes: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    sold: number;
  }[];
}

// ============================================
// Order Types
// ============================================

export interface OrderWithDetails {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string | null;
  subtotal: number;
  fees: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
  status: string;
  createdAt: Date;
  event: {
    id: string;
    title: string;
    startDate: Date;
  };
  tickets: {
    id: string;
    ticketNumber: string;
    attendeeName: string;
    attendeeEmail: string;
    status: string;
    checkedIn: boolean;
    ticketType: {
      name: string;
    };
  }[];
}

// ============================================
// Ticket Types
// ============================================

export interface TicketWithDetails {
  id: string;
  ticketNumber: string;
  attendeeName: string;
  attendeeEmail: string;
  status: string;
  checkedIn: boolean;
  checkedInAt: Date | null;
  qrToken: string;
  event: {
    id: string;
    title: string;
    startDate: Date;
    venueName: string | null;
  };
  ticketType: {
    name: string;
  };
  order: {
    orderNumber: string;
  };
}

// ============================================
// Payment Types
// ============================================

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  error?: {
    code: string;
    message: string;
  };
}

// ============================================
// Webhook Types
// ============================================

export interface WebhookPayload {
  event: string;
  timestamp: string;
  data: unknown;
}

export interface WebhookDeliveryResult {
  success: boolean;
  statusCode?: number;
  error?: string;
}

// ============================================
// Zod schemas for runtime validation
// ============================================

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export const sortSchema = z.object({
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const dateRangeSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

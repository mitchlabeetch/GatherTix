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
 * Provider interface barrel exports.
 */

export type {
  OrderData,
  CheckoutResult,
  WebhookEvent,
  RefundResult,
  PaymentProvider,
} from "./payment.js";

export type {
  EmailAddress,
  EmailAttachment,
  EmailOptions,
  EmailResult,
  EmailProvider,
} from "./email.js";

export type {
  UploadResult,
  StorageProvider,
} from "./storage.js";

export type {
  PaymentProviderName,
  EmailProviderName,
  StorageProviderName,
  ProviderConfig,
  ProviderContainer,
} from "./factory.js";

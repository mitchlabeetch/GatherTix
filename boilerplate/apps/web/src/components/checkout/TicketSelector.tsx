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
 * TicketSelector — Guest checkout flow component.
 *
 * Requirements:
 *   - Zero login requirement — guest-only checkout
 *   - Cents-based math throughout (prices stored as Int in cents)
 *   - Quantity +/- buttons with hard shadow borders (Neo-Editorial style)
 *   - Sliding scale support (isSlidingScale=true shows price range input)
 *   - Optional donation block with preset amounts (Leaf Green accent)
 *   - Total calculation: sum(ticket price × qty) + donationAmount, in cents
 *   - CTA "Checkout as Guest" disabled when total === 0
 *   - NO account creation prompt, ever
 */

"use client";

import * as React from "react";
import "./TicketSelector.css";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TicketTypeOption {
  id: string;
  name: string;
  description?: string;
  /** Price in cents (e.g. 2500 = $25.00) */
  price: number;
  /** Currency code (default "USD") */
  currency?: string;
  /** Remaining available quantity */
  available: number;
  /** Max tickets per order */
  maxPerOrder?: number;
  /** Min tickets per order */
  minPerOrder?: number;
  /** If true, show sliding scale price range inputs */
  isSlidingScale?: boolean;
  /** Minimum allowed price in cents (used when isSlidingScale=true) */
  minPrice?: number;
  /** Suggested/recommended price in cents (used when isSlidingScale=true) */
  suggestedPrice?: number;
  /** If true, ticket is a volunteer/comp — bypasses payment */
  isVolunteer?: boolean;
}

export interface TicketSelection {
  ticketTypeId: string;
  quantity: number;
  /** Chosen price in cents (may differ from base price for sliding scale) */
  priceCents: number;
}

interface TicketSelectorProps {
  ticketTypes: TicketTypeOption[];
  /** Called when user confirms selections and clicks "Checkout as Guest" */
  onCheckout: (selections: TicketSelection[], donationCents: number) => void;
  /** Organization name for the donation block copy */
  organizationName?: string;
  /** Currency code (default "USD") */
  currency?: string;
}

// ── Preset donation amounts (in cents) ───────────────────────────────────────
const PRESET_DONATIONS = [
  { label: "$10", cents: 1000 },
  { label: "$25", cents: 2500 },
  { label: "$50", cents: 5000 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Format cents as a dollar string, e.g. 2500 → "$25.00" */
function formatCents(cents: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

/** Clamp a number between min and max */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ── Component ─────────────────────────────────────────────────────────────────

export function TicketSelector({
  ticketTypes,
  onCheckout,
  organizationName = "our organization",
  currency = "USD",
}: TicketSelectorProps) {
  // Quantity for each ticket type (keyed by id)
  const [quantities, setQuantities] = React.useState<Record<string, number>>(
    () => Object.fromEntries(ticketTypes.map((t) => [t.id, 0]))
  );

  // Chosen price in cents for sliding-scale tickets (keyed by id)
  const [slidingPrices, setSlidingPrices] = React.useState<Record<string, number>>(
    () =>
      Object.fromEntries(
        ticketTypes
          .filter((t) => t.isSlidingScale)
          .map((t) => [t.id, t.suggestedPrice ?? t.price])
      )
  );

  // Selected preset donation in cents (0 = no donation)
  const [donationCents, setDonationCents] = React.useState<number>(0);
  // Custom donation amount string (editable text input)
  const [customDonation, setCustomDonation] = React.useState<string>("");

  // ── Derived values ──────────────────────────────────────────────────────────

  const ticketSubtotal = ticketTypes.reduce((sum, t) => {
    const qty = quantities[t.id] ?? 0;
    if (qty === 0) return sum;
    const unitPrice = t.isSlidingScale
      ? (slidingPrices[t.id] ?? t.price)
      : t.isVolunteer
      ? 0
      : t.price;
    return sum + unitPrice * qty;
  }, 0);

  const effectiveDonation =
    customDonation !== ""
      ? Math.max(0, Math.round(parseFloat(customDonation) * 100) || 0)
      : donationCents;

  const grandTotalCents = ticketSubtotal + effectiveDonation;

  const hasSelections = Object.values(quantities).some((q) => q > 0);
  const checkoutDisabled = !hasSelections || grandTotalCents < 0;

  // ── Event handlers ──────────────────────────────────────────────────────────

  function handleQuantityChange(ticketId: string, delta: number) {
    const ticket = ticketTypes.find((t) => t.id === ticketId);
    if (!ticket) return;
    const current = quantities[ticketId] ?? 0;
    const min = ticket.minPerOrder ?? 0;
    const max = Math.min(ticket.maxPerOrder ?? 10, ticket.available);
    setQuantities((prev) => ({
      ...prev,
      [ticketId]: clamp(current + delta, min === 0 && current > 0 ? 0 : min, max),
    }));
  }

  function handleSlidingPrice(ticketId: string, value: string) {
    const ticket = ticketTypes.find((t) => t.id === ticketId);
    if (!ticket) return;
    const cents = Math.round(parseFloat(value) * 100) || 0;
    const min = ticket.minPrice ?? 0;
    const max = ticket.suggestedPrice ? ticket.suggestedPrice * 3 : 100_000;
    setSlidingPrices((prev) => ({
      ...prev,
      [ticketId]: clamp(cents, min, max),
    }));
  }

  function handlePresetDonation(cents: number) {
    setDonationCents((prev) => (prev === cents ? 0 : cents));
    setCustomDonation("");
  }

  function handleCustomDonation(value: string) {
    setCustomDonation(value);
    setDonationCents(0);
  }

  function handleCheckout() {
    const selections: TicketSelection[] = ticketTypes
      .filter((t) => (quantities[t.id] ?? 0) > 0)
      .map((t) => ({
        ticketTypeId: t.id,
        quantity: quantities[t.id] ?? 0,
        priceCents: t.isVolunteer
          ? 0
          : t.isSlidingScale
          ? (slidingPrices[t.id] ?? t.price)
          : t.price,
      }));
    onCheckout(selections, effectiveDonation);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="ts-root">
      {/* ── Ticket type list ─────────────────────────────────────────────── */}
      <div className="ts-card">
        {ticketTypes.map((ticket, index) => {
          const qty = quantities[ticket.id] ?? 0;
          const maxQty = Math.min(ticket.maxPerOrder ?? 10, ticket.available);

          return (
            <div key={ticket.id} className={`ts-ticket-row${index === 0 ? " ts-ticket-row--first" : ""}`}>
              {/* Row: name + price + quantity controls */}
              <div className="ts-ticket-row-inner">
                {/* Left: name, description, price */}
                <div className="ts-ticket-info">
                  <div className="ts-ticket-name-row">
                    <span className="ts-ticket-name">{ticket.name}</span>
                    {ticket.isVolunteer && <TicketBadge variant="volunteer" label="Volunteer" />}
                    {ticket.isSlidingScale && <TicketBadge variant="sliding" label="Pay What You Can" />}
                  </div>

                  {ticket.description && (
                    <p className="ts-ticket-description">{ticket.description}</p>
                  )}

                  {/* Price display */}
                  <p className={`ts-ticket-price${ticket.isVolunteer ? " ts-ticket-price--volunteer" : ""}`}>
                    {ticket.isVolunteer
                      ? "FREE — Comp ticket"
                      : ticket.isSlidingScale
                      ? `${formatCents(ticket.minPrice ?? 0, currency)} – ${formatCents(ticket.suggestedPrice ?? ticket.price, currency)} suggested`
                      : formatCents(ticket.price, currency)}
                  </p>
                </div>

                {/* Right: quantity controls */}
                <div className="ts-qty-controls">
                  <QtyButton
                    label="−"
                    onClick={() => handleQuantityChange(ticket.id, -1)}
                    disabled={qty === 0}
                  />
                  <span className="ts-qty-value">{qty}</span>
                  <QtyButton
                    label="+"
                    onClick={() => handleQuantityChange(ticket.id, 1)}
                    disabled={qty >= maxQty}
                  />
                </div>
              </div>

              {/* Sliding scale price input — shown when ticket selected and isSlidingScale */}
              {ticket.isSlidingScale && qty > 0 && (
                <div className="ts-sliding-panel">
                  <label htmlFor={`sliding-${ticket.id}`} className="ts-sliding-label">
                    Choose your price (min {formatCents(ticket.minPrice ?? 0, currency)})
                  </label>
                  <div className="ts-sliding-input-row">
                    <span className="ts-sliding-currency">$</span>
                    <input
                      id={`sliding-${ticket.id}`}
                      type="number"
                      min={((ticket.minPrice ?? 0) / 100).toFixed(2)}
                      step="0.01"
                      value={((slidingPrices[ticket.id] ?? ticket.price) / 100).toFixed(2)}
                      onChange={(e) => handleSlidingPrice(ticket.id, e.target.value)}
                      className="ts-sliding-input"
                    />
                    {ticket.suggestedPrice && (
                      <span className="ts-sliding-suggested">
                        Suggested: {formatCents(ticket.suggestedPrice, currency)}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Optional donation block ──────────────────────────────────────── */}
      <div className="ts-card">
        {/* Impact statement header */}
        <div className="ts-donation-header">
          💚 100% of your donation goes directly to {organizationName}. No platform fees.
        </div>

        <div className="ts-donation-body">
          <p className="ts-donation-prompt">Add a donation (optional)</p>

          {/* Preset amount chips */}
          <div className="ts-donation-chips">
            {PRESET_DONATIONS.map(({ label, cents }) => {
              const isSelected = donationCents === cents && customDonation === "";
              return (
                <button
                  key={cents}
                  type="button"
                  onClick={() => handlePresetDonation(cents)}
                  aria-pressed={isSelected}
                  className="ts-donation-chip"
                >
                  {label}
                </button>
              );
            })}

            {/* Custom donation input */}
            <div className="ts-custom-donation-row">
              <span className="ts-custom-donation-currency">$</span>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Other"
                value={customDonation}
                onChange={(e) => handleCustomDonation(e.target.value)}
                className="ts-custom-donation-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Order summary ────────────────────────────────────────────────── */}
      <div className="ts-summary">
        {/* Ticket subtotals */}
        {ticketTypes
          .filter((t) => (quantities[t.id] ?? 0) > 0)
          .map((ticket) => {
            const qty = quantities[ticket.id] ?? 0;
            const unitPrice = ticket.isVolunteer
              ? 0
              : ticket.isSlidingScale
              ? (slidingPrices[ticket.id] ?? ticket.price)
              : ticket.price;
            return (
              <div key={ticket.id} className="ts-summary-line">
                <span>
                  {ticket.name} × {qty}
                </span>
                <span>
                  {ticket.isVolunteer ? "FREE" : formatCents(unitPrice * qty, currency)}
                </span>
              </div>
            );
          })}

        {/* Donation line */}
        {effectiveDonation > 0 && (
          <div className="ts-summary-donation-line">
            <span>💚 Donation</span>
            <span>{formatCents(effectiveDonation, currency)}</span>
          </div>
        )}

        {/* Total */}
        <div className="ts-summary-total">
          <span>Total</span>
          <span>{formatCents(grandTotalCents, currency)}</span>
        </div>
      </div>

      {/* ── Checkout CTA — NO account creation prompt ────────────────────── */}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={checkoutDisabled}
        aria-disabled={checkoutDisabled}
        className="ts-checkout-btn"
      >
        🎟 Checkout as Guest
      </button>

      {/* Guest-checkout assurance — no sign-up prompt */}
      <p className="ts-checkout-note">
        No account required. You&apos;ll receive your tickets by email.
      </p>
    </div>
  );
}

// ── QtyButton — quantity +/- control ─────────────────────────────────────────

function QtyButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label === "+" ? "Increase quantity" : "Decrease quantity"}
      className="ts-qty-btn"
    >
      {label}
    </button>
  );
}

// ── TicketBadge — label chip for ticket type tags ─────────────────────────────

function TicketBadge({ variant, label }: { variant: "volunteer" | "sliding"; label: string }) {
  return (
    <span className={`ts-badge ts-badge--${variant}`}>{label}</span>
  );
}

export default TicketSelector;

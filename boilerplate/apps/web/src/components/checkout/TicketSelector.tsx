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
    <div
      style={{
        maxWidth: "40rem",
        margin: "0 auto",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* ── Ticket type list ─────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--bg-white)",
          border: "1px solid var(--border-hard)",
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        {ticketTypes.map((ticket, index) => {
          const qty = quantities[ticket.id] ?? 0;
          const maxQty = Math.min(ticket.maxPerOrder ?? 10, ticket.available);
          const isFirst = index === 0;

          return (
            <div
              key={ticket.id}
              style={{
                padding: "1.25rem 1.5rem",
                borderTop: isFirst ? "none" : "1px solid var(--border-soft)",
              }}
            >
              {/* Row: name + price + quantity controls */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {/* Left: name, description, price */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--font-size-base)",
                        fontWeight: "var(--font-weight-semibold)",
                        color: "var(--ink-base)",
                      }}
                    >
                      {ticket.name}
                    </span>
                    {ticket.isVolunteer && (
                      <TicketBadge label="Volunteer" color="var(--action-success)" />
                    )}
                    {ticket.isSlidingScale && (
                      <TicketBadge label="Pay What You Can" color="var(--action-warning)" />
                    )}
                  </div>

                  {ticket.description && (
                    <p
                      style={{
                        fontSize: "var(--font-size-sm)",
                        color: "var(--ink-muted)",
                        margin: "0 0 0.25rem",
                      }}
                    >
                      {ticket.description}
                    </p>
                  )}

                  {/* Price display */}
                  <p
                    style={{
                      fontSize: "var(--font-size-sm)",
                      fontWeight: "var(--font-weight-medium)",
                      color: ticket.isVolunteer ? "var(--action-success)" : "var(--ink-base)",
                    }}
                  >
                    {ticket.isVolunteer
                      ? "FREE — Comp ticket"
                      : ticket.isSlidingScale
                      ? `${formatCents(ticket.minPrice ?? 0, currency)} – ${formatCents(ticket.suggestedPrice ?? ticket.price, currency)} suggested`
                      : formatCents(ticket.price, currency)}
                  </p>
                </div>

                {/* Right: quantity controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                  }}
                >
                  <QtyButton
                    label="−"
                    onClick={() => handleQuantityChange(ticket.id, -1)}
                    disabled={qty === 0}
                  />
                  <span
                    style={{
                      minWidth: "1.5rem",
                      textAlign: "center",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--font-size-base)",
                      fontWeight: "var(--font-weight-semibold)",
                      color: "var(--ink-base)",
                    }}
                  >
                    {qty}
                  </span>
                  <QtyButton
                    label="+"
                    onClick={() => handleQuantityChange(ticket.id, 1)}
                    disabled={qty >= maxQty}
                  />
                </div>
              </div>

              {/* Sliding scale price input — shown when ticket selected and isSlidingScale */}
              {ticket.isSlidingScale && qty > 0 && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem 1rem",
                    backgroundColor: "var(--bg-paper)",
                    border: "1px solid var(--border-hard)",
                    borderRadius: "var(--radius-ui)",
                  }}
                >
                  <label
                    htmlFor={`sliding-${ticket.id}`}
                    style={{
                      display: "block",
                      fontSize: "var(--font-size-xs)",
                      fontWeight: "var(--font-weight-semibold)",
                      letterSpacing: "var(--letter-spacing-widest)",
                      textTransform: "uppercase",
                      color: "var(--ink-muted)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Choose your price (min {formatCents(ticket.minPrice ?? 0, currency)})
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "var(--ink-muted)", fontSize: "var(--font-size-sm)" }}>$</span>
                    <input
                      id={`sliding-${ticket.id}`}
                      type="number"
                      min={((ticket.minPrice ?? 0) / 100).toFixed(2)}
                      step="0.01"
                      value={((slidingPrices[ticket.id] ?? ticket.price) / 100).toFixed(2)}
                      onChange={(e) => handleSlidingPrice(ticket.id, e.target.value)}
                      style={{
                        width: "7rem",
                        padding: "0.375rem 0.75rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "var(--font-size-base)",
                        color: "var(--ink-base)",
                        backgroundColor: "var(--bg-white)",
                        border: "1px solid var(--border-hard)",
                        borderRadius: "var(--radius-ui)",
                        outline: "none",
                      }}
                    />
                    {ticket.suggestedPrice && (
                      <span style={{ fontSize: "var(--font-size-xs)", color: "var(--ink-muted)" }}>
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
      <div
        style={{
          backgroundColor: "var(--bg-white)",
          border: "1px solid var(--border-hard)",
          borderRadius: "var(--radius-card)",
          overflow: "hidden",
          marginBottom: "1.5rem",
        }}
      >
        {/* Impact statement header */}
        <div
          style={{
            backgroundColor: "var(--action-success)",
            color: "#FFFFFF",
            padding: "0.875rem 1.5rem",
            fontSize: "var(--font-size-sm)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        >
          💚 100% of your donation goes directly to {organizationName}. No platform fees.
        </div>

        <div style={{ padding: "1.25rem 1.5rem" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-sm)",
              fontWeight: "var(--font-weight-semibold)",
              color: "var(--ink-base)",
              marginBottom: "0.75rem",
            }}
          >
            Add a donation (optional)
          </p>

          {/* Preset amount chips */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "0.75rem",
            }}
          >
            {PRESET_DONATIONS.map(({ label, cents }) => {
              const isSelected = donationCents === cents && customDonation === "";
              return (
                <button
                  key={cents}
                  type="button"
                  onClick={() => handlePresetDonation(cents)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "4rem",
                    padding: "0.375rem 1rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--font-size-sm)",
                    fontWeight: "var(--font-weight-semibold)",
                    color: isSelected ? "#FFFFFF" : "var(--action-success)",
                    backgroundColor: isSelected ? "var(--action-success)" : "var(--bg-white)",
                    border: "1px solid var(--action-success)",
                    borderRadius: "var(--radius-ui)",
                    cursor: "pointer",
                    boxShadow: isSelected ? "var(--shadow-flat-xs)" : "none",
                    transition: "background-color 150ms ease-in-out, color 150ms ease-in-out",
                  }}
                >
                  {label}
                </button>
              );
            })}

            {/* Custom donation input */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <span style={{ fontSize: "var(--font-size-sm)", color: "var(--ink-muted)" }}>$</span>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Other"
                value={customDonation}
                onChange={(e) => handleCustomDonation(e.target.value)}
                style={{
                  width: "5rem",
                  padding: "0.375rem 0.5rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--ink-base)",
                  backgroundColor: "var(--bg-white)",
                  border: "1px solid var(--border-hard)",
                  borderRadius: "var(--radius-ui)",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Order summary ────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--bg-paper)",
          border: "1px solid var(--border-hard)",
          borderRadius: "var(--radius-card)",
          padding: "1.25rem 1.5rem",
          marginBottom: "1.5rem",
        }}
      >
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
              <div
                key={ticket.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "var(--font-size-sm)",
                  color: "var(--ink-muted)",
                  marginBottom: "0.5rem",
                }}
              >
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "var(--font-size-sm)",
              color: "var(--action-success)",
              marginBottom: "0.5rem",
            }}
          >
            <span>💚 Donation</span>
            <span>{formatCents(effectiveDonation, currency)}</span>
          </div>
        )}

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid var(--border-hard)",
            marginTop: "0.75rem",
            paddingTop: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-base)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--ink-base)",
          }}
        >
          <span>Total</span>
          <span>{formatCents(grandTotalCents, currency)}</span>
        </div>
      </div>

      {/* ── Checkout CTA — NO account creation prompt ────────────────────── */}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={checkoutDisabled}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
          padding: "1rem 1.5rem",
          fontFamily: "var(--font-body)",
          fontSize: "var(--font-size-base)",
          fontWeight: "var(--font-weight-semibold)",
          letterSpacing: "var(--letter-spacing-wide)",
          color: "#FFFFFF",
          backgroundColor: checkoutDisabled ? "var(--ink-faint)" : "var(--action-primary)",
          border: "1px solid var(--ink-base)",
          borderRadius: "var(--radius-ui)",
          boxShadow: checkoutDisabled ? "none" : "var(--shadow-flat-md)",
          cursor: checkoutDisabled ? "not-allowed" : "pointer",
          transition: "transform 150ms ease-in-out, box-shadow 150ms ease-in-out",
        }}
        onMouseEnter={(e) => {
          if (!checkoutDisabled) {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(-1px, -1px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-flat-lg)";
          }
        }}
        onMouseLeave={(e) => {
          if (!checkoutDisabled) {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-flat-md)";
          }
        }}
        onMouseDown={(e) => {
          if (!checkoutDisabled) {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(4px, 4px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }
        }}
        onMouseUp={(e) => {
          if (!checkoutDisabled) {
            (e.currentTarget as HTMLButtonElement).style.transform = "translate(-1px, -1px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-flat-lg)";
          }
        }}
      >
        🎟 Checkout as Guest
      </button>

      {/* Guest-checkout assurance — no sign-up prompt */}
      <p
        style={{
          marginTop: "0.75rem",
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: "var(--font-size-xs)",
          color: "var(--ink-muted)",
        }}
      >
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
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2rem",
        height: "2rem",
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-lg)",
        fontWeight: "var(--font-weight-bold)",
        lineHeight: 1,
        color: disabled ? "var(--ink-faint)" : "var(--ink-base)",
        backgroundColor: "var(--bg-white)",
        border: `1px solid ${disabled ? "var(--border-soft)" : "var(--border-hard)"}`,
        borderRadius: "var(--radius-ui)",
        boxShadow: disabled ? "none" : "var(--shadow-flat-xs)",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "transform 100ms ease-in-out, box-shadow 100ms ease-in-out",
      }}
      onMouseDown={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(1px, 1px)";
      }}
      onMouseUp={(e) => {
        if (!disabled)
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
      }}
    >
      {label}
    </button>
  );
}

// ── TicketBadge — label chip for ticket type tags ─────────────────────────────

function TicketBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.125rem 0.5rem",
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-xs)",
        fontWeight: "var(--font-weight-semibold)",
        letterSpacing: "var(--letter-spacing-wide)",
        color: "#FFFFFF",
        backgroundColor: color,
        borderRadius: "var(--radius-ui)",
      }}
    >
      {label}
    </span>
  );
}

export default TicketSelector;

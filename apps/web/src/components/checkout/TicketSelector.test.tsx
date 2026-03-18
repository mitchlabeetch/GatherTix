// @vitest-environment jsdom
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

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { TicketSelector, type TicketTypeOption } from "./TicketSelector";

// ── Test fixtures ─────────────────────────────────────────────────────────

const gaTicket: TicketTypeOption = {
  id: "ga",
  name: "General Admission",
  price: 2500,
  available: 100,
  maxPerOrder: 5,
};

const vipTicket: TicketTypeOption = {
  id: "vip",
  name: "VIP Access",
  price: 7500,
  available: 10,
  maxPerOrder: 2,
  description: "Includes backstage tour",
};

const volunteerTicket: TicketTypeOption = {
  id: "vol",
  name: "Volunteer Comp",
  price: 0,
  available: 50,
  isVolunteer: true,
};

const slidingTicket: TicketTypeOption = {
  id: "pwyw",
  name: "Pay What You Can",
  price: 2000,
  available: 50,
  isSlidingScale: true,
  minPrice: 500,
  suggestedPrice: 2000,
};

const allTickets = [gaTicket, vipTicket, volunteerTicket];

// ── Tests ─────────────────────────────────────────────────────────────────

describe("TicketSelector", () => {
  let mockCheckout: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCheckout = vi.fn();
  });

  // ── Rendering ─────────────────────────────────────────────────────────

  describe("rendering", () => {
    it("renders all ticket type names", () => {
      render(<TicketSelector ticketTypes={allTickets} onCheckout={mockCheckout} />);
      expect(screen.getByText("General Admission")).toBeInTheDocument();
      expect(screen.getByText("VIP Access")).toBeInTheDocument();
      expect(screen.getByText("Volunteer Comp")).toBeInTheDocument();
    });

    it("renders formatted prices for paid tickets", () => {
      render(<TicketSelector ticketTypes={allTickets} onCheckout={mockCheckout} />);
      expect(screen.getByText("$25.00")).toBeInTheDocument();
      expect(screen.getByText("$75.00")).toBeInTheDocument();
    });

    it("shows 'FREE — Comp ticket' for volunteer tickets", () => {
      render(<TicketSelector ticketTypes={allTickets} onCheckout={mockCheckout} />);
      expect(screen.getByText("FREE \u2014 Comp ticket")).toBeInTheDocument();
    });

    it("renders ticket description when provided", () => {
      render(<TicketSelector ticketTypes={allTickets} onCheckout={mockCheckout} />);
      expect(screen.getByText("Includes backstage tour")).toBeInTheDocument();
    });
  });

  // ── Quantity controls ─────────────────────────────────────────────────

  describe("quantity controls", () => {
    it("increments quantity when + is clicked", () => {
      const { container } = render(
        <TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />
      );
      const qtyDisplay = container.querySelector(".ts-qty-value")!;
      expect(qtyDisplay).toHaveTextContent("0");

      fireEvent.click(screen.getByLabelText("Increase quantity"));
      expect(qtyDisplay).toHaveTextContent("1");
    });

    it("decrements quantity when \u2212 is clicked", () => {
      const { container } = render(
        <TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />
      );
      const incBtn = screen.getByLabelText("Increase quantity");
      const decBtn = screen.getByLabelText("Decrease quantity");
      const qtyDisplay = container.querySelector(".ts-qty-value")!;

      fireEvent.click(incBtn);
      fireEvent.click(incBtn);
      expect(qtyDisplay).toHaveTextContent("2");

      fireEvent.click(decBtn);
      expect(qtyDisplay).toHaveTextContent("1");
    });

    it("does not go below zero", () => {
      const { container } = render(
        <TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />
      );
      const decBtn = screen.getByLabelText("Decrease quantity");
      const qtyDisplay = container.querySelector(".ts-qty-value")!;

      fireEvent.click(decBtn);
      expect(qtyDisplay).toHaveTextContent("0");
    });

    it("respects maxPerOrder", () => {
      const limited: TicketTypeOption = { ...gaTicket, maxPerOrder: 2 };
      const { container } = render(
        <TicketSelector ticketTypes={[limited]} onCheckout={mockCheckout} />
      );
      const incBtn = screen.getByLabelText("Increase quantity");
      const qtyDisplay = container.querySelector(".ts-qty-value")!;

      for (let i = 0; i < 5; i++) fireEvent.click(incBtn);
      expect(qtyDisplay).toHaveTextContent("2");
    });

    it("respects available stock when lower than maxPerOrder", () => {
      const scarce: TicketTypeOption = { ...gaTicket, available: 1, maxPerOrder: 10 };
      const { container } = render(
        <TicketSelector ticketTypes={[scarce]} onCheckout={mockCheckout} />
      );
      const incBtn = screen.getByLabelText("Increase quantity");
      const qtyDisplay = container.querySelector(".ts-qty-value")!;

      for (let i = 0; i < 5; i++) fireEvent.click(incBtn);
      expect(qtyDisplay).toHaveTextContent("1");
    });
  });

  // ── Sliding scale ─────────────────────────────────────────────────────

  describe("sliding scale", () => {
    it("does not show price input when quantity is zero", () => {
      render(
        <TicketSelector ticketTypes={[slidingTicket]} onCheckout={mockCheckout} />
      );
      expect(screen.queryByLabelText(/Choose your price/i)).not.toBeInTheDocument();
    });

    it("shows price input when a sliding-scale ticket is selected", () => {
      render(
        <TicketSelector ticketTypes={[slidingTicket]} onCheckout={mockCheckout} />
      );
      fireEvent.click(screen.getByLabelText("Increase quantity"));
      expect(screen.getByLabelText(/Choose your price/i)).toBeInTheDocument();
    });
  });

  // ── Donations ─────────────────────────────────────────────────────────

  describe("donations", () => {
    it("renders preset donation chips ($10, $25, $50)", () => {
      render(<TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />);
      expect(screen.getByRole("button", { name: "$10" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "$25" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "$50" })).toBeInTheDocument();
    });

    it("toggles preset donation on click (select then deselect)", () => {
      render(<TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />);
      const chip25 = screen.getByRole("button", { name: "$25" });

      // Select
      fireEvent.click(chip25);
      expect(chip25).toHaveAttribute("aria-pressed", "true");

      // Deselect (toggle off)
      fireEvent.click(chip25);
      expect(chip25).toHaveAttribute("aria-pressed", "false");
    });

    it("custom donation overrides preset", () => {
      render(<TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />);

      // Select a ticket so checkout is possible
      fireEvent.click(screen.getByLabelText("Increase quantity"));

      // Select $25 preset first
      fireEvent.click(screen.getByRole("button", { name: "$25" }));

      // Type custom donation — should override preset
      const customInput = screen.getByPlaceholderText("Other");
      fireEvent.change(customInput, { target: { value: "15" } });

      // Checkout and verify donation amount
      fireEvent.click(screen.getByRole("button", { name: /Checkout as Guest/i }));

      expect(mockCheckout).toHaveBeenCalledWith(
        expect.any(Array),
        1500 // $15.00 = 1500 cents
      );
    });
  });

  // ── Order summary & checkout ──────────────────────────────────────────

  describe("order summary & checkout", () => {
    it("checkout button is disabled when nothing is selected", () => {
      render(<TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />);
      const btn = screen.getByRole("button", { name: /Checkout as Guest/i });
      expect(btn).toBeDisabled();
    });

    it("checkout button is enabled after selecting a ticket", () => {
      render(<TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />);
      fireEvent.click(screen.getByLabelText("Increase quantity"));
      const btn = screen.getByRole("button", { name: /Checkout as Guest/i });
      expect(btn).not.toBeDisabled();
    });

    it("shows volunteer tickets as FREE in the summary", () => {
      render(
        <TicketSelector ticketTypes={[volunteerTicket]} onCheckout={mockCheckout} />
      );
      fireEvent.click(screen.getByLabelText("Increase quantity"));
      expect(screen.getByText("FREE")).toBeInTheDocument();
    });

    it("calls onCheckout with correct selections and donation", () => {
      render(
        <TicketSelector ticketTypes={allTickets} onCheckout={mockCheckout} />
      );

      // Select 2 GA, 1 Volunteer (skip VIP)
      const incButtons = screen.getAllByLabelText("Increase quantity");
      fireEvent.click(incButtons[0]); // GA → 1
      fireEvent.click(incButtons[0]); // GA → 2
      fireEvent.click(incButtons[2]); // Volunteer → 1

      // Add $10 preset donation
      fireEvent.click(screen.getByRole("button", { name: "$10" }));

      // Checkout
      fireEvent.click(screen.getByRole("button", { name: /Checkout as Guest/i }));

      expect(mockCheckout).toHaveBeenCalledOnce();
      expect(mockCheckout).toHaveBeenCalledWith(
        [
          { ticketTypeId: "ga", quantity: 2, priceCents: 2500 },
          { ticketTypeId: "vol", quantity: 1, priceCents: 0 },
        ],
        1000 // $10 donation
      );
    });

    it("displays the correct grand total", () => {
      const { container } = render(
        <TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />
      );

      // Select 2 GA tickets: 2 × $25.00 = $50.00
      const incBtn = screen.getByLabelText("Increase quantity");
      fireEvent.click(incBtn);
      fireEvent.click(incBtn);

      // Add $25 donation → total = $75.00
      fireEvent.click(screen.getByRole("button", { name: "$25" }));

      const totalEl = container.querySelector(".ts-summary-total");
      expect(totalEl).toHaveTextContent("$75.00");
    });
  });

  // ── Guest-only checkout UX ────────────────────────────────────────────

  describe("guest-only checkout UX", () => {
    it("shows guest assurance text (no account required)", () => {
      render(<TicketSelector ticketTypes={[gaTicket]} onCheckout={mockCheckout} />);
      expect(screen.getByText(/No account required/i)).toBeInTheDocument();
    });

    it("shows custom organization name in donation prompt", () => {
      render(
        <TicketSelector
          ticketTypes={[gaTicket]}
          onCheckout={mockCheckout}
          organizationName="Local Food Bank"
        />
      );
      expect(screen.getByText(/Local Food Bank/)).toBeInTheDocument();
    });
  });
});

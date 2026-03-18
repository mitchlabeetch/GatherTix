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

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { EventHero } from "./EventHero";

const baseProps = {
  eventName: "Summer Music Festival",
  dateTime: "Saturday, June 21, 2025 • 7:00 PM",
  venue: "Central Park, New York",
};

describe("EventHero", () => {
  it("renders event name as an h1 heading", () => {
    render(<EventHero {...baseProps} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Summer Music Festival");
  });

  it("renders date/time and venue", () => {
    render(<EventHero {...baseProps} />);
    expect(screen.getByText("Saturday, June 21, 2025 • 7:00 PM")).toBeInTheDocument();
    expect(screen.getByText("Central Park, New York")).toBeInTheDocument();
  });

  it("renders tagline when provided", () => {
    render(<EventHero {...baseProps} tagline="An unforgettable evening of live music" />);
    expect(screen.getByText("An unforgettable evening of live music")).toBeInTheDocument();
  });

  it("does not render tagline element when not provided", () => {
    const { container } = render(<EventHero {...baseProps} />);
    expect(container.querySelector(".eh-tagline")).toBeNull();
  });

  it("renders organization name when provided", () => {
    render(<EventHero {...baseProps} organizationName="Community Arts Foundation" />);
    expect(screen.getByText("Community Arts Foundation")).toBeInTheDocument();
  });

  it("does not render organization label when not provided", () => {
    const { container } = render(<EventHero {...baseProps} />);
    expect(container.querySelector(".eh-org-label")).toBeNull();
  });

  it("renders image when imageUrl is provided", () => {
    render(<EventHero {...baseProps} imageUrl="/hero.jpg" imageAlt="Festival crowd" />);
    const img = screen.getByRole("img", { name: "Festival crowd" });
    expect(img).toHaveAttribute("src", "/hero.jpg");
  });

  it("does not render <img> element when imageUrl is absent", () => {
    const { container } = render(<EventHero {...baseProps} />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("displays 'Get Tickets' as default CTA label", () => {
    render(<EventHero {...baseProps} />);
    expect(screen.getByRole("button", { name: "Get Tickets" })).toBeInTheDocument();
  });

  it("displays custom CTA label when provided", () => {
    render(<EventHero {...baseProps} ctaLabel="Register Now" />);
    expect(screen.getByRole("button", { name: "Register Now" })).toBeInTheDocument();
  });

  it("shows 'Sold Out' and disables button when ctaDisabled is true", () => {
    render(<EventHero {...baseProps} ctaDisabled />);
    const btn = screen.getByRole("button", { name: "Sold Out" });
    expect(btn).toBeDisabled();
  });

  it("fires onCtaClick when CTA button is clicked", () => {
    const handleClick = vi.fn();
    render(<EventHero {...baseProps} onCtaClick={handleClick} />);
    fireEvent.click(screen.getByRole("button", { name: "Get Tickets" }));
    expect(handleClick).toHaveBeenCalledOnce();
  });
});

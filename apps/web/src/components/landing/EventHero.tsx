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
 * EventHero — Neo-Editorial event landing page hero component.
 *
 * Design constraints (strictly enforced):
 *   - Background: var(--bg-paper) with bottom border in var(--ink-base)
 *   - Typography: Outfit font, 5xl–7xl, tight tracking
 *   - CTA: Cobalt Blue, 1px black border, hard shadow offset
 *   - Image: Aspect-square, 2px black border, grayscale → color on hover
 *   - NO gradients, NO blur shadows, NO dark mode
 */

import * as React from "react";
import "./EventHero.css";

interface EventHeroProps {
  /** Full event title — displayed in Outfit display font */
  eventName: string;
  /** Short tagline or subtitle */
  tagline?: string;
  /** Event start date/time (formatted string, e.g. "Saturday, June 21, 2025 • 7:00 PM") */
  dateTime: string;
  /** Venue name and/or city */
  venue: string;
  /** URL for the hero image — displayed with grayscale → color transition on hover */
  imageUrl?: string;
  /** Alt text for the hero image */
  imageAlt?: string;
  /** Label for the primary CTA button */
  ctaLabel?: string;
  /** Callback fired when the CTA button is clicked */
  onCtaClick?: () => void;
  /** When true, the CTA button is disabled (e.g. tickets sold out) */
  ctaDisabled?: boolean;
  /** Organization name shown as a meta label above the event title */
  organizationName?: string;
}

export function EventHero({
  eventName,
  tagline,
  dateTime,
  venue,
  imageUrl,
  imageAlt = "",
  ctaLabel = "Get Tickets",
  onCtaClick,
  ctaDisabled = false,
  organizationName,
}: EventHeroProps) {
  return (
    <section className="eh-section">
      <div className={`eh-inner ${imageUrl ? "eh-inner--with-image" : "eh-inner--text-only"}`}>
        {/* ── Text column ─────────────────────────────────────────────────── */}
        <div>
          {organizationName && (
            <p className="eh-org-label">{organizationName}</p>
          )}

          {/* Event name — Outfit display font, tight tracking */}
          <h1 className={`eh-event-name${!tagline ? " eh-event-name--no-tagline" : ""}`}>
            {eventName}
          </h1>

          {tagline && (
            <p className="eh-tagline">{tagline}</p>
          )}

          {/* Event meta */}
          <div className="eh-meta">
            <EventMetaRow icon="📅" text={dateTime} />
            <EventMetaRow icon="📍" text={venue} />
          </div>

          {/* CTA button — Cobalt Blue, hard shadow */}
          <button
            type="button"
            onClick={onCtaClick}
            disabled={ctaDisabled}
            aria-disabled={ctaDisabled}
            className="eh-cta"
          >
            {ctaDisabled ? "Sold Out" : ctaLabel}
          </button>
        </div>

        {/* ── Image column — grayscale → color on hover ────────────────── */}
        {imageUrl && (
          <div className="eh-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={imageAlt}
              className="eh-image"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ── EventMetaRow — helper for date/venue display ──────────────────────────────

function EventMetaRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="eh-meta-row">
      <span role="img" aria-hidden="true" className="eh-meta-icon">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

export default EventHero;

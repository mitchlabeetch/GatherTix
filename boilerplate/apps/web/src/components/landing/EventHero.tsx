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
    <section
      style={{
        backgroundColor: "var(--bg-paper)",
        borderBottom: "2px solid var(--ink-base)",
        padding: "4rem 1.5rem",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: imageUrl ? "1fr 1fr" : "1fr",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* ── Text column ─────────────────────────────────────────────────── */}
        <div>
          {organizationName && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-xs)",
                fontWeight: "var(--font-weight-semibold)",
                letterSpacing: "var(--letter-spacing-widest)",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                marginBottom: "0.75rem",
              }}
            >
              {organizationName}
            </p>
          )}

          {/* Event name — Outfit display font, tight tracking */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: "800",
              lineHeight: "1.05",
              letterSpacing: "-0.025em",
              color: "var(--ink-base)",
              marginBottom: tagline ? "1rem" : "1.5rem",
            }}
          >
            {eventName}
          </h1>

          {tagline && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-xl)",
                fontWeight: "var(--font-weight-medium)",
                color: "var(--ink-muted)",
                marginBottom: "1.5rem",
                lineHeight: "var(--line-height-snug)",
              }}
            >
              {tagline}
            </p>
          )}

          {/* Event meta */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <EventMetaRow icon="📅" text={dateTime} />
            <EventMetaRow icon="📍" text={venue} />
          </div>

          {/* CTA button — Cobalt Blue, hard shadow */}
          <button
            type="button"
            onClick={onCtaClick}
            disabled={ctaDisabled}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem 2rem",
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-base)",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "var(--letter-spacing-wide)",
              color: "#FFFFFF",
              backgroundColor: ctaDisabled ? "var(--ink-faint)" : "var(--action-primary)",
              border: "1px solid var(--ink-base)",
              borderRadius: "var(--radius-ui)",
              boxShadow: ctaDisabled ? "none" : "var(--shadow-flat-md)",
              cursor: ctaDisabled ? "not-allowed" : "pointer",
              transition: "transform 150ms ease-in-out, box-shadow 150ms ease-in-out",
            }}
            onMouseEnter={(e) => {
              if (!ctaDisabled) {
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(-2px, -2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-flat-lg)";
              }
            }}
            onMouseLeave={(e) => {
              if (!ctaDisabled) {
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-flat-md)";
              }
            }}
            onMouseDown={(e) => {
              if (!ctaDisabled) {
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(4px, 4px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }
            }}
            onMouseUp={(e) => {
              if (!ctaDisabled) {
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(-2px, -2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-flat-lg)";
              }
            }}
          >
            {ctaDisabled ? "Sold Out" : ctaLabel}
          </button>
        </div>

        {/* ── Image column — grayscale → color on hover ────────────────── */}
        {imageUrl && (
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              border: "2px solid var(--ink-base)",
              boxShadow: "var(--shadow-flat-md)",
              borderRadius: "var(--radius-card)",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.filter = "grayscale(0%)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.filter = "grayscale(100%)";
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={imageAlt}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "grayscale(100%)",
                transition: "filter 300ms ease-in-out",
              }}
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-base)",
        fontWeight: "var(--font-weight-medium)",
        color: "var(--ink-base)",
      }}
    >
      <span role="img" aria-hidden="true" style={{ fontSize: "1rem" }}>
        {icon}
      </span>
      <span>{text}</span>
    </div>
  );
}

export default EventHero;

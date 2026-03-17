# GatherTix — Developer Roadmap

> **Objective:** Make GatherTix the undisputed best-in-class lightweight ticketing system for small events, community groups, and non-profits — entirely self-hosted, zero platform fees, AGPL-licensed.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| 🔴 | Critical — blocks core functionality |
| 🟠 | High priority — needed for production readiness |
| 🟡 | Medium priority — quality of life, polish |
| 🟢 | Nice to have — future growth feature |
| 🔒 | Security-related |
| ♿ | Accessibility |
| 🧪 | Testing |
| 📖 | Documentation |

---

## Phase 0 — Foundation Stability *(current sprint)*

**Goal:** Close all known bugs and tech-debt that block reliable use.

### Security & Robustness

- [x] 🔴🔒 **Webhook hex validation** — guard `Buffer.from(receivedHex, 'hex')` against odd-length strings that cause `timingSafeEqual` to throw (`zeffy-payment.ts`)
- [ ] 🔴🔒 **Rate limiting on auth endpoints** — add per-IP throttle (Fastify `@fastify/rate-limit`) on `/auth/login`, `/auth/register`, password-reset
- [ ] 🔴🔒 **CSRF protection** — validate `Origin` / `Referer` on all state-changing tRPC mutations; add `SameSite=Strict` to session cookies
- [ ] 🔴🔒 **Secrets audit** — move all credentials from `.env.example` defaults to required-with-no-default; fail fast at startup if missing
- [ ] 🟠🔒 **Content-Security-Policy header** — set strict CSP via Next.js `headers()` in `next.config.ts`; remove inline styles that break it (completed as part of CSS refactor)
- [ ] 🟠🔒 **Dependency update: Next.js 15.0.0 → 16.1.7** (Dependabot PR #1) — patches CVE-2026-27977/78/79/80 and CVE-2026-29057; see PR #1 analysis below
- [ ] 🟠🔒 **Argon2id for passwords** — confirm `packages/shared` hashing uses Argon2id (not bcrypt) with recommended memory/iteration parameters

### CSS & Design System

- [x] 🟠 **Refactor `TicketSelector.tsx`** — replace all inline `style={{ }}` with CSS classes from `design-tokens.css`
- [x] 🟠 **Refactor `EventHero.tsx`** — replace all inline `style={{ }}` with CSS classes from `design-tokens.css`
- [x] 🟠 **Self-host fonts** — remove Google Fonts CDN import; self-host Outfit and Plus Jakarta Sans via `@fontsource` npm packages

### Branding & Icons

- [x] 🟡 **Improve SVG icons** — redesign `drafticon.svg` and `draftheaderlogo.svg` with refined Neo-Editorial ticket-stub motif; update `public/icon.svg` and `public/logo-full.svg`
- [x] 🟡 **App metadata** — update `layout.tsx` with correct title template, description, and icon references
- [ ] 🟡 **favicon.ico** — generate a 32×32 `.ico` from `icon.svg` for legacy browser compatibility
- [ ] 🟡 **OpenGraph / Twitter card images** — generate `og-image.png` (1200×630) for social sharing

### Test Coverage Baseline

- [ ] 🧪 **Unit tests: `ZeffyPaymentProvider.handleWebhook`** — cover: valid signature, invalid signature, odd-length hex, missing header, bad JSON payload, length mismatch
- [ ] 🧪 **Unit tests: `TicketSelector`** — cover: quantity increment/decrement, sliding scale input, donation chip selection, checkout disabled when total=0, custom donation amount
- [ ] 🧪 **Unit tests: `EventHero`** — cover: renders with/without image, renders with/without tagline, CTA disabled state

### Success Criteria — Phase 0

- [ ] All `pnpm typecheck` and `pnpm lint` checks pass with zero warnings
- [ ] `pnpm test` passes with ≥80% line coverage on `zeffy-payment.ts` and `TicketSelector.tsx`
- [ ] No inline `style={{ }}` attributes in `TicketSelector.tsx` or `EventHero.tsx`
- [ ] No Google Fonts CDN calls in any bundle (verified with Lighthouse network tab)
- [ ] Security audit via `pnpm audit --audit-level=high` returns zero high/critical issues

---

## Phase 1 — Guest Checkout MVP *(next 2–4 weeks)*

**Goal:** A guest user can discover an event, select tickets (including sliding-scale), optionally donate, and receive a PDF ticket by email — with zero account required.

### Core Checkout Flow

- [ ] 🔴 **Wire `TicketSelector` → real API** — connect `onCheckout` callback to tRPC `orders.create` mutation; receive `orderId` back
- [ ] 🔴 **Guest order creation** — `POST /orders` accepts `guestEmail`, `guestName`, ticket selections, donation; creates `Order` + `Ticket` records; no auth required
- [ ] 🔴 **Stripe checkout session** — on order creation, generate Stripe Checkout Session; redirect guest to Stripe-hosted page
- [ ] 🔴 **Stripe webhook handler** — process `checkout.session.completed`; update order status; enqueue PDF + confirmation email jobs
- [ ] 🔴 **Zeffy checkout flow** — equivalent to Stripe but using `ZeffyPaymentProvider.createPaymentIntent` for non-profit orgs

### Order Confirmation

- [ ] 🔴 **PDF ticket generation** — BullMQ `pdf-ticket` job uses `packages/pdf` React PDF template; uploads to MinIO; sends pre-signed URL
- [ ] 🔴 **Order confirmation email** — `packages/email` `order-confirmation.tsx` sent via Resend; includes event details, PDF attachment link, QR code per ticket
- [ ] 🟠 **QR code generation** — generate per-ticket QR codes containing `ticketId` (signed HMAC) for scanner app validation

### Event Public Page

- [ ] 🟠 **Event page route** — `app/events/[slug]/page.tsx` renders `EventHero` + `TicketSelector` with real event data fetched server-side
- [ ] 🟠 **Event availability** — real-time ticket count; disable CTA when sold out; handle race condition with optimistic locking or database-level `SELECT FOR UPDATE`
- [ ] 🟡 **Event slug** — auto-generate from event name; allow custom slug; redirect on conflict

### Scanner App

- [ ] 🟠 **QR scan validation** — `POST /scan` validates ticket HMAC, checks-in ticket; returns `valid | already-checked-in | invalid`
- [ ] 🟠 **Offline-capable scan** — service worker caches manifest of valid ticket IDs for offline validation with sync on reconnect
- [ ] 🟡 **Scanner UI feedback** — animated success (green) / failure (red) scan result with haptic feedback on mobile

### Test Coverage

- [ ] 🧪 **E2E: full guest checkout** — Playwright: select ticket → donate → Stripe test card → confirm email received (use Mailhog in CI)
- [ ] 🧪 **Integration: order creation** — Vitest + Prisma test DB: create order, assert tickets created, assert idempotency key prevents duplicate
- [ ] 🧪 **Integration: Stripe webhook** — mock Stripe signature; verify order status updated; PDF job enqueued

### Success Criteria — Phase 1

- [ ] Guest can complete checkout without creating an account in under 60 seconds
- [ ] Ticket PDF received by email within 30 seconds of payment confirmation
- [ ] QR code scan correctly validates and marks ticket as used
- [ ] Zero data loss under concurrent purchases (tested with k6 at 50 concurrent users)

---

## Phase 2 — Organiser Dashboard MVP *(weeks 4–8)*

**Goal:** An organiser can self-serve: create an event, set up ticket types (including sliding scale and volunteer comps), go live, and track real-time attendance.

### Authentication & Organisations

- [ ] 🔴 **Email verification** — require email confirmation before first login; resend link endpoint with rate limit
- [ ] 🟠 **Org invite system** — invite co-organiser by email; accept/decline flow; role: `ADMIN | EDITOR | VIEWER`
- [ ] 🟠 **Password reset** — secure forgot-password flow; time-limited signed token; invalidate after use

### Event Management

- [ ] 🔴 **Create/edit event form** — fields: name, description, date/time (TZ-aware), venue, cover image, slug, max capacity
- [ ] 🔴 **Ticket type management** — CRUD for ticket types; support `GENERAL`, `VIP`, `VOLUNTEER`, `SLIDING_SCALE`; set price, available quantity, per-order limits
- [ ] 🟠 **Event publishing** — draft → published → closed states; published events visible on public event page
- [ ] 🟠 **Cover image upload** — direct-to-MinIO signed URL upload; resize/optimise server-side with `sharp`
- [ ] 🟡 **Event duplication** — clone event with all ticket types for recurring events

### Analytics Dashboard

- [ ] 🟠 **Real-time stats** — total sold, total revenue (cents), check-in rate; auto-refresh via tRPC subscriptions (WebSocket)
- [ ] 🟡 **Sales over time** — chart (recharts) of tickets sold per hour; export as CSV
- [ ] 🟡 **Attendee list** — paginated list with search; export CSV with name, email, ticket type, check-in status

### Webhook Management

- [ ] 🟡 **Webhook CRUD UI** — create/edit/delete webhooks; select event types; show delivery log with retry
- [ ] 🟡 **Webhook delivery retry** — BullMQ exponential backoff (3 attempts); dead-letter queue for manual replay

### Test Coverage

- [ ] 🧪 **E2E: organiser creates event and goes live** — Playwright: register → create org → create event → add ticket type → publish → verify public page
- [ ] 🧪 **E2E: organiser views attendee list** — create mock orders; verify list pagination and CSV export
- [ ] 🧪 **Unit: event slug generation** — edge cases: special chars, duplicates, max length

### Success Criteria — Phase 2

- [ ] Organiser can go from registration to live event in under 5 minutes
- [ ] Dashboard loads in under 1s on a standard VPS (2 vCPU, 2GB RAM)
- [ ] All form inputs have appropriate ARIA labels (axe-core scan: zero violations)

---

## Phase 3 — Production Hardening *(weeks 8–12)*

**Goal:** GatherTix is reliable, observable, and easy to self-host for non-technical users.

### Reliability & Performance

- [ ] 🔴 **Database connection pooling** — configure PgBouncer or Prisma connection limit; document in `docker-compose.prod.yml`
- [ ] 🔴 **Queue failure handling** — ensure BullMQ jobs have retry logic; alert on dead-letter queue depth
- [ ] 🟠 **Health check endpoints** — `GET /health` returns DB + Redis connectivity; used by Docker HEALTHCHECK and load balancer
- [ ] 🟠 **Graceful shutdown** — drain in-flight requests before process exit; ensure no partial writes on SIGTERM
- [ ] 🟡 **DB index audit** — add composite indexes for `orders(eventId, status)`, `tickets(orderId)`, `webhookDeliveries(webhookId, createdAt)`

### Observability

- [ ] 🟠 **Structured logging** — Pino already in place; add request ID correlation across API + Worker; add `eventId`, `orderId` to all log lines
- [ ] 🟡 **OpenTelemetry traces** — instrument tRPC procedures and DB queries; export to Jaeger or OTLP-compatible sink
- [ ] 🟡 **Error tracking** — integrate Sentry (self-hosted or cloud); capture unhandled exceptions + source maps
- [ ] 🟡 **Metrics** — expose Prometheus `/metrics` from API (Fastify `@fastify/metrics`); dashboard in Grafana

### Self-Hosting UX

- [ ] 🟠 **One-command setup** — `docker-compose up` with sensible defaults; `.env.example` documents every variable with descriptions
- [ ] 🟠 **First-run wizard** — on first boot, prompt for admin email/password and org name via a setup page; skip if `SETUP_COMPLETE=true`
- [ ] 🟡 **Upgrade guide** — document Prisma migration steps; provide `./scripts/upgrade.sh` that runs migrations and restarts services
- [ ] 🟡 **Backup script** — `./scripts/backup.sh` that dumps PostgreSQL and MinIO to a local archive

### Documentation

- [ ] 📖 **User guide** — how to: create an event, go live, scan tickets, view analytics; with screenshots
- [ ] 📖 **Admin guide** — Docker deployment, environment variables reference, backup/restore, SSL setup with Caddy
- [ ] 📖 **API reference** — auto-generated from tRPC + Zod schemas; OpenAPI spec exported from Fastify
- [ ] 📖 **Contributing guide** — local dev setup, commit conventions, PR checklist, test requirements
- [ ] 📖 **Architecture diagram** — C4 model (context, container, component) diagrams in Mermaid

### Test Coverage

- [ ] 🧪 **Load test** — k6 script: 100 concurrent guests purchasing tickets; assert P95 < 500ms, zero 5xx errors
- [ ] 🧪 **Chaos test** — randomly kill Redis and assert queue jobs recover on reconnect; kill DB and assert graceful error to user
- [ ] 🧪 **Accessibility audit** — run axe-core on all pages via Playwright; assert zero critical violations

### Success Criteria — Phase 3

- [ ] P95 checkout latency < 200ms (API response, excluding Stripe redirect)
- [ ] Zero data loss after graceful shutdown under load
- [ ] `docker-compose up` on a fresh machine produces a working app in under 2 minutes
- [ ] 90%+ unit test coverage on all business logic (orders, payments, webhooks)

---

## Phase 4 — Scale & Ecosystem *(weeks 12–20)*

**Goal:** GatherTix handles 10,000-attendee events; attracts community contributors; supports the open-source ecosystem.

### Multi-Currency & Multi-Language

- [ ] 🟠 **Multi-currency support** — Stripe's `currency` field used; display price in attendee's locale with `Intl.NumberFormat`; store in cents always
- [ ] 🟡 **i18n (Internationalisation)** — Next.js i18n routing; `next-intl` for translations; ship EN + FR as initial languages; community contributions for others

### Advanced Ticketing Features

- [ ] 🟢 **Waitlist** — when sold out, offer waitlist signup; notify first in queue when ticket becomes available (refund/cancellation)
- [ ] 🟢 **Discount codes / promo codes** — percentage or fixed discount; usage limits; expiry date
- [ ] 🟢 **Group registration** — buy tickets for multiple attendees with individual names; send per-attendee emails
- [ ] 🟢 **Ticket transfer** — attendee can transfer ticket to another email before event; invalidates original QR code
- [ ] 🟢 **Refunds** — organiser-initiated partial or full refund via Stripe Refunds API; notify attendee; update check-in status

### Integrations

- [ ] 🟢 **Calendar export** — `.ics` file attached to confirmation email; Google Calendar / Apple Calendar deep links in email
- [ ] 🟢 **Zapier / Make webhook consumer** — documentation + example Zap for "new order → add to spreadsheet"
- [ ] 🟢 **Mailchimp / listmonk list sync** — add attendee email to mailing list opt-in on purchase

### Theming

- [ ] 🟡 **Per-organisation theme** — organiser can select accent colour from a curated palette of 8 options; `design-tokens.css` variables overridden at runtime via `data-theme` attribute
- [ ] 🟡 **Custom logo upload** — replace GatherTix logo in email templates and public event page header with organiser's logo

### Community & Open Source

- [ ] 📖 **`CHANGELOG.md`** — automated via `semantic-release` + Conventional Commits; published on every tagged release
- [ ] 📖 **GitHub issue templates** — bug report, feature request, security disclosure
- [ ] 📖 **Community forum** — GitHub Discussions enabled; categories: Help, Ideas, Show & Tell
- [ ] 🟢 **Plugin API** — stable plugin hook points for: payment providers, email providers, PDF templates; documented with example plugin
- [ ] 🟢 **Demo instance** — public read-only demo at `demo.gathertix.io` seeded with sample events; reset nightly

### Success Criteria — Phase 4

- [ ] Community has submitted ≥5 external contributions (PRs merged)
- [ ] ≥3 alternative language translations contributed by community
- [ ] GatherTix handles a 10,000-ticket event without database or queue saturation
- [ ] Plugin API allows a custom Stripe-alternative payment provider to be wired in without modifying core code

---

## Dependabot PR #1 Analysis

> **PR:** Bump `next` from `15.0.0` → `16.1.7` in `/boilerplate/apps/web`
> **Opened by:** Dependabot
> **Status:** Open (not merged)

### Security fixes in Next.js 16.1.7 (critical context)

| CVE | Description | Severity |
|-----|-------------|----------|
| CVE-2026-27977 | Cross-site dev WebSocket connections from privacy-sensitive origins | High |
| CVE-2026-27978 | Server Action submissions from privacy-sensitive contexts | High |
| CVE-2026-27979 | `maxPostponedStateSize` not always respected | Medium |
| CVE-2026-27980 | Missing disk cache LRU bound for `next/image` | Medium |
| CVE-2026-29057 | HTTP request smuggling via `http-proxy` in rewrites | High |

### Benefits of merging PR #1

- Closes 5 CVEs, including 3 rated High severity
- HTTP request smuggling fix (CVE-2026-29057) is particularly important for proxied deployments
- LRU disk cache for `next/image` prevents unbounded disk usage in production
- Aligns with latest stable Next.js ecosystem (tooling, plugins, docs)

### Risks / cons

- **Major version jump** (15.0.0 → 16.1.7): could introduce breaking changes in APIs, routing, or build output
- **App Router changes**: Next.js 16 introduces layout and streaming improvements that may affect existing page behaviour
- **pnpm lockfile** will change: needs `pnpm install` re-run; CI cache invalidated
- **`eslint-config-next`** version needs matching bump (currently `15.0.0` in `devDependencies`)
- **Untested upgrade path**: no existing E2E tests to confirm nothing broke

### Recommendation

**Merge, with caution:**

1. Before merging, also bump `eslint-config-next` to `16.1.7` in `package.json` to match
2. Run `pnpm install` to update lockfile
3. Run full E2E suite (`pnpm test:e2e`) — add checkout and dashboard smoke tests first (Phase 1 priority)
4. Review Next.js 16 migration guide for any breaking changes relevant to the project (especially App Router)
5. Test Docker production build (`pnpm build`) before deploying

The security fixes (particularly CVE-2026-29057 HTTP smuggling) make this upgrade important for any internet-facing deployment.

---

## Checks & Definitions of Done

Every feature or fix merged to `main` must satisfy:

### Code Quality
- [ ] `pnpm typecheck` passes with zero errors
- [ ] `pnpm lint` passes with zero warnings
- [ ] No `console.log` statements in committed code (use Pino logger)
- [ ] No hardcoded secrets, URLs, or environment-specific values
- [ ] No inline `style={{ }}` attributes in React components (use CSS classes)

### Testing
- [ ] Unit tests for all new business logic (≥80% line coverage)
- [ ] E2E test for any new user-facing flow
- [ ] Tests run in CI with real PostgreSQL and Redis (not mocks)

### Security
- [ ] `pnpm audit --audit-level=high` passes
- [ ] All user inputs validated with Zod at API boundary
- [ ] All database queries use Prisma (no raw SQL injection vectors)
- [ ] Auth-protected routes verified with middleware test

### Accessibility
- [ ] All interactive elements have visible focus indicators (`:focus-visible`)
- [ ] All images have meaningful `alt` text
- [ ] All form inputs have associated `<label>` elements
- [ ] Color contrast ratio ≥ 4.5:1 for normal text (WCAG 2.1 AA)
- [ ] `axe-core` scan produces zero critical violations

### Performance
- [ ] Lighthouse Performance score ≥ 90 on event public page
- [ ] No blocking render-critical resources (fonts self-hosted, no CDN dependencies)
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID < 100ms

### Documentation
- [ ] Public-facing API endpoints documented in OpenAPI spec
- [ ] New environment variables added to `.env.example` with description
- [ ] `CHANGELOG.md` entry for any user-visible change

---

## End-User Goals

| User | Goal | Success metric |
|------|------|----------------|
| **Event Attendee** | Buy a ticket without creating an account | Checkout completed in < 60s; ticket in inbox within 30s |
| **Scanner Volunteer** | Scan QR codes quickly at the door | Scan response < 1s; works offline |
| **Event Organiser** | Create an event and go live quickly | Time to live event < 5 minutes |
| **Non-profit Admin** | Pay zero platform fees | $0 in platform fees via Zeffy integration |
| **Tech Admin** | Self-host on their own infrastructure | `docker-compose up` → working app in < 2 minutes |
| **Developer** | Extend or embed GatherTix | Clean plugin API; documented; tested |

---

*Last updated: 2026-03-17 — maintained by the GatherTix contributor community.*
*License: AGPL-3.0-or-later*

# GatherTix — Complete Roadmap v2.0 (March 2026)

> **Objective:** Make GatherTix the perfect lightweight ticketing system for small events, community groups, and non-profits — entirely self-hosted, zero platform fees, AGPL-licensed.
>
> Every external service (payments, email, storage, auth, monitoring) MUST be implemented behind an **adapter/provider interface**. The user chooses their provider via configuration. GatherTix never hard-couples to a single vendor.

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
| 🔌 | Provider/adapter pattern — user-configurable |
| 🏗️ | Architecture / infrastructure |

---

## Phase 0 — Foundation Stability & Architecture *(current sprint)*

**Goal:** Close all known bugs, tech-debt, and structural issues that block reliable development. Establish the provider-agnostic architecture pattern.

### 0.1 — Repository Restructure 🏗️

- [ ] 🔴🏗️ **Flatten the `boilerplate/` nesting** — promote `apps/`, `packages/`, `docker/`, `turbo.json`, root `package.json` out of `boilerplate/` to repo root. This is the real application — it shouldn't live in a subfolder.
- [ ] 🔴🏗️ **Move CI workflows** — relocate `boilerplate/.github/workflows/` to `.github/workflows/` so GitHub Actions actually run.
- [ ] 🟠🏗️ **Move docs to `docs/`** — relocate `audit-*.md`, `INDEX.md` into `docs/` directory. Keep `ROADMAP.md`, `README.md`, `LICENSE`, `CONTRIBUTING.md` at root.
- [ ] 🟠🏗️ **Remove `implementation_plan.md.resolved`** — this is an alien file from a FastAPI/SQLAlchemy CRM project (`turbo-octo-robot`). It has no relation to GatherTix.
- [ ] 🟠🏗️ **Move templates** — consolidate `email-templates/`, `landing-pages/`, `ticket-templates/`, `design-tokens.css`, SVGs into `docs/design/` or `packages/` as appropriate.
- [ ] 🟠📖 **Root README rewrite** — replace the 34-byte placeholder with real content: project description, philosophy, quick start, architecture overview, link to roadmap and contributing guide. Fix all `yourusername/ticketing-platform` placeholders.

### 0.2 — Prisma 7 Schema & Database Foundation 🏗️

- [ ] 🔴🏗️ **Create `schema.prisma`** — define the complete data model:
  - `Organization` (id, name, slug, settings JSON, createdAt)
  - `User` (id, email, passwordHash, emailVerified, role, orgId)
  - `Session` (id, userId, expiresAt, createdAt)
  - `Event` (id, orgId, name, slug, description, date, venue, timezone, coverImageUrl, status [DRAFT|PUBLISHED|CLOSED], maxCapacity)
  - `TicketType` (id, eventId, name, kind [GENERAL|VIP|VOLUNTEER|SLIDING_SCALE], price, minPrice, maxPrice, quantity, perOrderLimit, sortOrder)
  - `Order` (id, eventId, guestEmail, guestName, userId?, status [PENDING|PAID|REFUNDED|CANCELLED], totalCents, currency, paymentProvider, paymentIntentId, idempotencyKey, createdAt)
  - `Ticket` (id, orderId, ticketTypeId, qrCodeData, qrCodeHmac, checkedInAt, checkedInBy)
  - `WebhookEndpoint` (id, orgId, url, events[], secret, active)
  - `WebhookDelivery` (id, endpointId, eventType, payload, statusCode, attempts, nextRetryAt)
- [ ] 🔴🏗️ **Prisma 7 ESM migration** — PR #4 bumped to `^7.5.0`. This requires:
  - Change generator from `prisma-client-js` → `prisma-client` with explicit `output` path
  - Install `@prisma/adapter-pg` driver adapter
  - Set `"type": "module"` in database package (or use bundler-compatible config)
  - Create `prisma.config.ts` for configuration
  - Update all `@prisma/client` imports to new output path
- [ ] 🟠🏗️ **Seed script** — `pnpm db:seed` populates sample org, user (password: `gathertix`), event with 3 ticket types for local development.

### 0.3 — Zod v4 Migration 🏗️

- [ ] 🔴🏗️ **Zod v4 breaking changes audit** — PR #4 bumped to `^4.3.6`. Requires:
  - Replace any `.nonstrict()` with `.passthrough()` / `.strict()` / `.strip()`
  - Update `.merge()` usage (now throws on overlapping keys)
  - Update error handling to new `ZodError` format
  - Replace `ZodSchema` generic type with `ZodType`
  - Verify `@hookform/resolvers` v5.2.2 compatibility
  - Verify `fastify-type-provider-zod` v6.1.0 compatibility

### 0.4 — Provider Interface Architecture 🔌

- [ ] 🔴🔌 **Define `PaymentProvider` interface** — `packages/shared/providers/payment.ts`:
  ```typescript
  interface PaymentProvider {
    name: string;
    createCheckoutSession(order: OrderData): Promise<CheckoutResult>;
    handleWebhook(payload: Buffer, headers: Headers): Promise<WebhookEvent>;
    createRefund(paymentId: string, amountCents?: number): Promise<RefundResult>;
    verifySignature(payload: Buffer, signature: string): boolean;
  }
  ```
- [ ] 🔴🔌 **Define `EmailProvider` interface** — `packages/shared/providers/email.ts`:
  ```typescript
  interface EmailProvider {
    name: string;
    send(options: EmailOptions): Promise<EmailResult>;
    sendBatch(messages: EmailOptions[]): Promise<EmailResult[]>;
  }
  ```
- [ ] 🔴🔌 **Define `StorageProvider` interface** — `packages/shared/providers/storage.ts`:
  ```typescript
  interface StorageProvider {
    name: string;
    upload(key: string, data: Buffer, contentType: string): Promise<string>;
    getSignedUrl(key: string, expiresInSeconds: number): Promise<string>;
    delete(key: string): Promise<void>;
  }
  ```
- [ ] 🟠🔌 **Provider factory + config** — a central `createProviders(config)` factory that reads `EMAIL_PROVIDER=smtp|resend|postal|ses`, `PAYMENT_PROVIDER=stripe|paypal|mollie|zeffy|manual`, `STORAGE_PROVIDER=minio|s3|local` from env and instantiates the correct adapter.

### 0.5 — Security & Robustness 🔒

- [x] 🔴🔒 **Webhook hex validation** — ✅ Done
- [ ] 🔴🔒 **Rate limiting on auth endpoints** — wire `@fastify/rate-limit` (already in `package.json` at `10.3.0`) on `/auth/login`, `/auth/register`, password-reset; 5 attempts per IP per 15 min
- [ ] 🔴🔒 **CSRF protection** — validate `Origin` / `Referer` on all state-changing tRPC mutations; set `SameSite=Strict` on session cookies
- [ ] 🔴🔒 **Secrets audit** — remove ALL defaults from `.env.example`; fail fast at startup if required secrets are missing. Replace `.env.example` section header "Redis" with "Valkey"
- [ ] 🟠🔒 **Content-Security-Policy header** — configure strict CSP via `next.config.ts` `headers()` or `@fastify/helmet`
- [x] 🟠🔒 **Dependency update: Next.js → 16.1.7** — ✅ Done via PR #4 (patches CVE-2026-27977/78/79/80, CVE-2026-29057)
- [x] 🟠🔒 **eslint-config-next alignment** — ✅ Done via PR #4 (`15.0.0` → `16.1.7`)
- [ ] 🟠🔒 **Argon2id confirmation** — verify `argon2` (now `^0.44.0` via PR #4) is configured with Argon2id variant, ≥64MB memory, ≥3 iterations, ≥4 parallelism
- [ ] 🟠🔒 **Lucia Auth deprecation plan** — Lucia was deprecated March 2025. Add migration task:
  - **Option A:** `oslo` + `arctic` (same author, maintained, MIT)
  - **Option B:** `better-auth` (actively maintained, self-hosted)
  - **Option C:** Custom session management using `oslo` primitives (session table + cookies + Argon2id)
  - **Decision:** Lock in choice by end of Phase 0. Implement in Phase 1.

### 0.6 — CSS & Design System

- [x] 🟠 **Refactor `TicketSelector.tsx`** — ✅ Done
- [x] 🟠 **Refactor `EventHero.tsx`** — ✅ Done
- [x] 🟠 **Self-host fonts** — ✅ Done (Outfit + Plus Jakarta Sans via `@fontsource`)
- [ ] 🟠 **Resolve font inconsistency** — `audit-design.md` specifies **Inter**; codebase uses **Outfit + Plus Jakarta Sans**. Pick one canonical source of truth. Update `design-tokens.css` `--font-sans` to match.

### 0.7 — Branding & Icons

- [x] 🟡 **SVG icon redesign** — ✅ Done
- [x] 🟡 **App metadata** — ✅ Done
- [ ] 🟡 **favicon.ico** — generate 32×32 `.ico` from `icon.svg`; add 180×180 Apple touch icon, 192×192 and 512×512 PWA manifest icons
- [ ] 🟡 **OpenGraph / Twitter card images** — generate `og-image.png` (1200×630) for social sharing

### 0.8 — Test Coverage Baseline 🧪

- [ ] 🧪 **Unit tests: `ZeffyPaymentProvider.handleWebhook`** — valid signature, invalid signature, odd-length hex, missing header, bad JSON, length mismatch
- [ ] 🧪 **Unit tests: `TicketSelector`** — quantity ±, sliding scale input, donation chips, checkout disabled at $0, custom donation
- [ ] 🧪 **Unit tests: `EventHero`** — with/without image, with/without tagline, CTA disabled
- [ ] 🧪 **Unit tests: provider factory** — correct adapter instantiation for each `EMAIL_PROVIDER`, `PAYMENT_PROVIDER`, `STORAGE_PROVIDER` value
- [ ] 🧪 **CI pipeline** — move workflows to `.github/workflows/`, verify `pnpm typecheck`, `pnpm lint`, `pnpm test` all run on PR

### Success Criteria — Phase 0

- [ ] All `pnpm typecheck` and `pnpm lint` pass with zero warnings
- [ ] `pnpm test` passes with ≥80% line coverage on `zeffy-payment.ts`, `TicketSelector.tsx`, provider factory
- [ ] No inline `style={{ }}` in refactored components
- [ ] No Google Fonts CDN calls
- [ ] `pnpm audit --audit-level=high` returns zero high/critical issues
- [ ] Prisma schema generates successfully; `pnpm db:migrate` creates all tables
- [ ] Repository has flat structure (no `boilerplate/` nesting)
- [ ] CI workflows run on GitHub

---

## Phase 1 — Guest Checkout MVP *(weeks 2–6)*

**Goal:** A guest user can discover an event, select tickets (including sliding-scale), optionally donate, and receive a PDF ticket by email — with zero account required. The organiser can configure their preferred payment and email provider.

### 1.1 — Auth Migration

- [ ] 🔴 **Replace Lucia Auth** — implement chosen auth solution from Phase 0 decision:
  - Session table in Prisma schema
  - Cookie-based session management
  - Login/register/logout tRPC procedures
  - Password hashing with Argon2id
- [ ] 🔴 **Remove `lucia` and `@lucia-auth/adapter-prisma` dependencies** — the `@lucia-auth/adapter-prisma` was already pinned to a non-existent version (`^4.1.0`, fixed to `^4.0.1` in PR #4); this library is deprecated and should be fully removed.

### 1.2 — Email Provider System 🔌

- [ ] 🔴🔌 **SMTP adapter** — `packages/email/providers/smtp.ts` using `nodemailer`. Supports any standard SMTP server (self-hosted Postfix, Mailcow, etc.). Config: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE`
- [ ] 🔴🔌 **Resend adapter** — `packages/email/providers/resend.ts` using existing `resend` SDK (`^6.9.4`). Config: `RESEND_API_KEY`
- [ ] 🟠🔌 **AWS SES adapter** — `packages/email/providers/ses.ts` using `@aws-sdk/client-ses`. Config: `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- [ ] 🟡🔌 **Postal adapter** — `packages/email/providers/postal.ts` for self-hosted Postal instances. Config: `POSTAL_URL`, `POSTAL_API_KEY`
- [ ] 🟡🔌 **Console/dev adapter** — `packages/email/providers/console.ts` that logs emails to stdout for local development (zero config required)
- [ ] 🟠 **Email template rendering** — React Email templates render to HTML via `@react-email/render`, then passed to whichever provider adapter is active. Templates are provider-agnostic.

### 1.3 — Payment Provider System 🔌

- [ ] 🔴🔌 **Stripe adapter** — `packages/shared/providers/stripe.ts` using `stripe@^20.4.1`. Creates Checkout Sessions; handles `checkout.session.completed` webhook.
- [ ] 🔴🔌 **Zeffy adapter** — existing `ZeffyPaymentProvider`; refactor to conform to `PaymentProvider` interface.
- [ ] 🟠🔌 **PayPal adapter** — `packages/shared/providers/paypal.ts` using PayPal REST SDK. Config: `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_WEBHOOK_ID`
- [ ] 🟠🔌 **Mollie adapter** — `packages/shared/providers/mollie.ts` for EU organizations. Config: `MOLLIE_API_KEY`
- [ ] 🟡🔌 **Manual/free adapter** — for free events or "pay at door" events. Creates order immediately with `PAID` status. No external API calls.
- [ ] 🟡🔌 **GoCardless adapter** — for UK/EU recurring and direct debit payments.

### 1.4 — Storage Provider System 🔌

- [ ] 🔴🔌 **MinIO/S3 adapter** — existing MinIO config refactored to `StorageProvider` interface. Works with any S3-compatible API (AWS S3, Backblaze B2, Garage, Cloudflare R2).
- [ ] 🟠🔌 **Local filesystem adapter** — `packages/shared/providers/local-storage.ts` for single-VPS deployments that don't want MinIO. Stores files to `./data/uploads/` with a static file server route.
- [ ] 🟡🔌 **Garage adapter** — BSD-3-Clause S3-compatible storage (recommended in tech audit as MinIO AGPL alternative). Config: `GARAGE_ENDPOINT`, `GARAGE_ACCESS_KEY`, `GARAGE_SECRET_KEY`

### 1.5 — Core Checkout Flow

- [ ] 🔴 **Wire `TicketSelector` → real API** — connect `onCheckout` to tRPC `orders.create` mutation
- [ ] 🔴 **Guest order creation** — `orders.create` accepts `guestEmail`, `guestName`, ticket selections, donation; creates `Order` + `Ticket` records; no auth required
- [ ] 🔴 **Payment provider dispatch** — `orders.create` reads `PAYMENT_PROVIDER` config and delegates to the appropriate adapter for checkout session creation
- [ ] 🔴 **Universal webhook handler** — `POST /webhooks/:provider` routes to the correct payment adapter's `handleWebhook()` method; updates order status; enqueues PDF + email jobs

### 1.6 — Order Confirmation

- [ ] 🔴 **PDF ticket generation** — BullMQ `pdf-ticket` job uses `packages/pdf` React PDF template; uploads to active storage provider; generates pre-signed URL
- [ ] 🔴 **Order confirmation email** — `packages/email` `order-confirmation.tsx` sent via active email provider; includes event details, PDF link, QR code per ticket
- [ ] 🟠 **QR code generation** — per-ticket QR codes containing `ticketId` + HMAC signature for scanner app validation

### 1.7 — Event Public Page

- [ ] 🟠 **Event page route** — `app/events/[slug]/page.tsx` renders `EventHero` + `TicketSelector` with real event data (server-side fetch)
- [ ] 🟠 **Event availability** — real-time ticket count; disable CTA when sold out; use `SELECT FOR UPDATE` for race condition prevention
- [ ] 🟡 **Event slug** — auto-generate from name; allow custom slug; 301 redirect on conflict

### 1.8 — Scanner App

- [ ] 🟠 **QR scan validation** — `POST /scan` validates ticket HMAC, checks-in ticket; returns `valid | already-checked-in | invalid`
- [ ] 🟠 **Offline-capable scan** — service worker caches manifest of valid ticket IDs for offline validation with sync on reconnect
- [ ] 🟡 **Scanner UI feedback** — animated success (green) / failure (red) with haptic feedback

### 1.9 — Docker & Infrastructure

- [ ] 🟠 **Docker Compose v2 syntax** — remove deprecated `version: "3.8"` key from `docker-compose.yml`
- [ ] 🟠 **Valkey alignment** — docker-compose already uses `valkey/valkey:8-alpine` ✅ but `.env.example` still says "Redis" in section header and uses `REDIS_URL`. Rename to `VALKEY_URL` or at minimum update comments.
- [ ] 🟡 **Mailhog/Mailpit service** — add optional `mailpit` container for local email testing (`docker-compose.dev.yml`). Works with SMTP adapter automatically.

### 1.10 — Test Coverage 🧪

- [ ] 🧪 **E2E: full guest checkout** — Playwright: select ticket → donate → Stripe test card → confirm email received (Mailpit in CI)
- [ ] 🧪 **Integration: order creation** — Vitest + Prisma test DB: create order, assert tickets created, assert idempotency key prevents duplicates
- [ ] 🧪 **Integration: Stripe webhook** — mock Stripe signature; verify order status updated; PDF job enqueued
- [ ] 🧪 **Unit: all payment adapters** — mock external APIs; verify each adapter conforms to `PaymentProvider` interface
- [ ] 🧪 **Unit: all email adapters** — mock transport; verify each adapter conforms to `EmailProvider` interface

### Success Criteria — Phase 1

- [ ] Guest can complete checkout without creating an account in under 60 seconds
- [ ] Ticket PDF received by email within 30 seconds of payment confirmation
- [ ] QR code scan correctly validates and marks ticket as used
- [ ] Zero data loss under concurrent purchases (k6 at 50 concurrent users)
- [ ] Switching `PAYMENT_PROVIDER=stripe` to `PAYMENT_PROVIDER=paypal` works with zero code changes
- [ ] Switching `EMAIL_PROVIDER=resend` to `EMAIL_PROVIDER=smtp` works with zero code changes

---

## Phase 2 — Organiser Dashboard MVP *(weeks 6–10)*

**Goal:** An organiser can self-serve: create an event, set up ticket types, go live, and track real-time attendance.

### 2.1 — Authentication & Organisations

- [ ] 🔴 **Email verification** — require email confirmation before first login; resend link with rate limit
- [ ] 🟠 **Org invite system** — invite co-organiser by email; accept/decline flow; roles: `ADMIN | EDITOR | VIEWER`
- [ ] 🟠 **Password reset** — forgot-password flow; time-limited signed token; invalidate after use
- [ ] 🟡 **OAuth login** — optional social login via `arctic` (GitHub, Google). Not a replacement for email/password — an addition.

### 2.2 — Event Management

- [ ] 🔴 **Create/edit event form** — name, description (rich text via Tiptap), date/time (TZ-aware), venue, cover image, slug, max capacity
- [ ] 🔴 **Ticket type management** — CRUD for `GENERAL`, `VIP`, `VOLUNTEER`, `SLIDING_SCALE`; price, quantity, per-order limits
- [ ] 🟠 **Event publishing** — `DRAFT → PUBLISHED → CLOSED` state machine; published events visible on public page
- [ ] 🟠 **Cover image upload** — direct-to-storage signed URL upload via active `StorageProvider`; resize/optimise with `sharp`
- [ ] 🟡 **Event duplication** — clone event + ticket types for recurring events
- [ ] 🟡 **Event series/recurrence** — define weekly/monthly patterns; auto-generate future events

### 2.3 — Analytics Dashboard

- [ ] 🟠 **Real-time stats** — total sold, revenue, check-in rate; auto-refresh via tRPC subscriptions (WebSocket)
- [ ] 🟡 **Sales over time** — chart (recharts) of tickets per hour; CSV export
- [ ] 🟡 **Attendee list** — paginated, searchable; export CSV (name, email, ticket type, check-in status)

### 2.4 — Webhook Management

- [ ] 🟡 **Webhook CRUD UI** — create/edit/delete; select event types; delivery log with retry
- [ ] 🟡 **Webhook delivery retry** — BullMQ exponential backoff (3 attempts); dead-letter queue

### 2.5 — Notification Provider System 🔌

- [ ] 🟡🔌 **Define `NotificationProvider` interface** — for future SMS/push/Slack notifications
- [ ] 🟡🔌 **Slack adapter** — post to a Slack channel on new order / check-in milestone
- [ ] 🟢🔌 **ntfy adapter** — self-hosted push notifications via [ntfy.sh](https://ntfy.sh) (FOSS, no vendor)
- [ ] 🟢🔌 **Gotify adapter** — alternative self-hosted push notification server

### 2.6 — Test Coverage 🧪

- [ ] 🧪 **E2E: organiser creates event and goes live** — register → org → event → ticket type → publish → verify public page
- [ ] 🧪 **E2E: organiser views attendee list** — mock orders; pagination; CSV export
- [ ] 🧪 **Unit: event slug generation** — special chars, duplicates, max length

### Success Criteria — Phase 2

- [ ] Organiser goes from registration to live event in under 5 minutes
- [ ] Dashboard loads in under 1s on a standard VPS (2 vCPU, 2GB RAM)
- [ ] All form inputs have appropriate ARIA labels (axe-core: zero violations)

---

## Phase 3 — Production Hardening *(weeks 10–14)*

**Goal:** GatherTix is reliable, observable, and easy to self-host for non-technical users.

### 3.1 — Reliability & Performance

- [ ] 🔴 **Database connection pooling** — configure PgBouncer or Prisma connection limit; document in `docker-compose.prod.yml`
- [ ] 🔴 **Queue failure handling** — BullMQ retry logic; alert on dead-letter queue depth
- [ ] 🟠 **Health check endpoints** — `GET /health` returns DB + Valkey connectivity; used by Docker HEALTHCHECK
- [ ] 🟠 **Graceful shutdown** — drain in-flight requests before SIGTERM; zero partial writes
- [ ] 🟡 **DB index audit** — composite indexes: `orders(eventId, status)`, `tickets(orderId)`, `webhookDeliveries(webhookId, createdAt)`

### 3.2 — ESLint + Tailwind Major Upgrades 🏗️

- [ ] 🟠 **ESLint 9/10 flat config migration** — PR #4 noted this was deferred. Migrate from `.eslintrc` to `eslint.config.ts` flat config; remove `@vercel/style-guide` if incompatible
- [ ] 🟡 **Tailwind CSS v4 migration** — PR #4 deferred this too. Migrate from `tailwind.config.ts` to CSS-based config; update all `@apply` and theme references

### 3.3 — Observability 🔌

- [ ] 🟠 **Structured logging** — Pino (now `^10.3.1`) with request ID correlation across API + Worker; `eventId`, `orderId` on all log lines
- [ ] 🟡🔌 **OpenTelemetry traces** — instrument tRPC procedures and DB queries; export to:
  - **Jaeger** (self-hosted, Apache-2.0)
  - **Grafana Tempo** (self-hosted, AGPL-3.0)
  - Any OTLP-compatible collector
- [ ] 🟡🔌 **Error tracking** — configurable provider:
  - **Sentry** (self-hosted or cloud, BSL)
  - **GlitchTip** (self-hosted, MIT — Sentry-compatible)
  - **Highlight.io** (self-hosted, Apache-2.0)
  - Config: `ERROR_TRACKING_PROVIDER=sentry|glitchtip|highlight|none`, `ERROR_TRACKING_DSN=...`
- [ ] 🟡🔌 **Metrics** — Prometheus `/metrics` from API (`@fastify/metrics`); dashboard in Grafana

### 3.4 — Self-Hosting UX

- [ ] 🟠 **One-command setup** — `docker compose up` with sensible defaults; exhaustive `.env.example` with descriptions per variable
- [ ] 🟠 **First-run wizard** — on first boot, setup page for admin email/password, org name, provider selection (payment, email, storage). Skip if `SETUP_COMPLETE=true`
- [ ] 🟡 **Upgrade guide** — `./scripts/upgrade.sh` runs Prisma migrations and restarts services
- [ ] 🟡 **Backup script** — `./scripts/backup.sh` dumps PostgreSQL + storage to local archive
- [ ] 🟡 **Caddy config** — production-ready Caddyfile with automatic HTTPS, reverse proxy for web + API

### 3.5 — GDPR & Privacy

- [ ] 🟠 **Cookie consent banner** — minimal, accessible, stores preference in localStorage
- [ ] 🟠 **Data export** — organiser can export all attendee data for their events (GDPR Article 20)
- [ ] 🟠 **Data deletion** — attendee can request deletion of their data; API endpoint + admin UI
- [ ] 🟡 **Privacy policy template** — pre-written template organisers can customize
- [ ] 🟡 **Data retention policy** — configurable auto-delete of orders older than X months

### 3.6 — Documentation 📖

- [ ] 📖 **User guide** — event creation, going live, scanning, analytics (with screenshots)
- [ ] 📖 **Admin guide** — Docker deployment, env vars reference, backup/restore, SSL with Caddy, provider configuration
- [ ] 📖 **API reference** — auto-generated from tRPC + Zod schemas; OpenAPI spec from Fastify
- [ ] 📖 **Contributing guide** — local dev setup, commit conventions, PR checklist, test requirements
- [ ] 📖 **Architecture diagram** — C4 model (context, container, component) in Mermaid
- [ ] 📖 **Provider guide** — how to write a custom payment/email/storage adapter with examples. The plugin contract.
- [ ] 📖 **Relabel `audit-documentation.md`** → `docs/USER_GUIDE_DRAFT.md` — make explicit this is a *specification*, not docs of working software

### 3.7 — Test Coverage 🧪

- [ ] 🧪 **Load test** — k6: 100 concurrent guests; P95 < 500ms; zero 5xx
- [ ] 🧪 **Chaos test** — kill Valkey, assert jobs recover; kill DB, assert graceful error
- [ ] 🧪 ♿ **Accessibility audit** — axe-core on all pages via Playwright; zero critical violations

### Success Criteria — Phase 3

- [ ] P95 checkout latency < 200ms (API, excluding payment redirect)
- [ ] Zero data loss after graceful shutdown under load
- [ ] `docker compose up` on a fresh machine → working app in under 2 minutes
- [ ] 90%+ unit test coverage on business logic
- [ ] GDPR data export and deletion work end-to-end

---

## Phase 4 — Scale & Ecosystem *(weeks 14–22)*

**Goal:** GatherTix handles 10,000-attendee events; attracts community contributors; supports a rich plugin ecosystem.

### 4.1 — Multi-Currency & Multi-Language

- [ ] 🟠 **Multi-currency** — payment provider's `currency` field; display via `Intl.NumberFormat`; always store in cents
- [ ] 🟡 **i18n** — `next-intl` for translations; ship EN + FR initially; community contributions for others
- [ ] 🟡 **RTL support** — CSS logical properties; test with Arabic/Hebrew

### 4.2 — Advanced Ticketing

- [ ] 🟢 **Waitlist** — sign up when sold out; FIFO notify on refund/cancellation
- [ ] 🟢 **Discount / promo codes** — percentage or fixed; usage limits; expiry
- [ ] 🟢 **Group registration** — buy for multiple attendees with individual names; per-attendee emails
- [ ] 🟢 **Ticket transfer** — attendee transfers to another email; invalidates original QR
- [ ] 🟢 **Refunds** — organiser-initiated via payment adapter's `createRefund()`; partial or full
- [ ] 🟢 **Seating / zones** — optional section assignment; visual seat map for larger venues
- [ ] 🟢 **Custom attendee fields** — organiser defines extra fields per ticket type (dietary, t-shirt size, etc.)

### 4.3 — Integrations 🔌

- [ ] 🟢 **Calendar export** — `.ics` file in confirmation email; Google Calendar / Apple Calendar deep links
- [ ] 🟢🔌 **Mailing list sync** — adapter interface:
  - **Listmonk** (self-hosted, AGPL-3.0) — recommended default
  - **Mailchimp** (proprietary) — for orgs already using it
  - Config: `MAILING_LIST_PROVIDER=listmonk|mailchimp|none`
- [ ] 🟢 **Zapier / Make webhook consumer** — docs + example Zap for "new order → spreadsheet"
- [ ] 🟢🔌 **Analytics provider** — adapter interface:
  - **Plausible** (self-hosted, AGPL-3.0) — privacy-first, recommended
  - **Umami** (self-hosted, MIT) — lightweight alternative
  - **PostHog** (self-hosted, MIT) — full product analytics
  - **None** — zero tracking by default
  - Config: `ANALYTICS_PROVIDER=plausible|umami|posthog|none`

### 4.4 — Theming

- [ ] 🟡 **Per-organisation theme** — organiser selects accent colour from curated palette; `design-tokens.css` overridden via `data-theme`
- [ ] 🟡 **Custom logo upload** — replace GatherTix logo in emails and public event page with organiser's logo
- [ ] 🟡 **Custom CSS injection** — advanced: organiser can paste custom CSS for their event pages

### 4.5 — Community & Open Source

- [ ] 📖 **`CHANGELOG.md`** — automated via `semantic-release` + Conventional Commits
- [ ] 📖 **GitHub issue templates** — bug report, feature request, security disclosure
- [ ] 📖 **GitHub Discussions** — categories: Help, Ideas, Show & Tell
- [ ] 🟢🔌 **Plugin API** — stable hook points for: payment providers, email providers, storage providers, PDF templates, notification channels. Documented with example plugin repo.
- [ ] 🟢 **Demo instance** — `demo.gathertix.io` seeded with sample events; reset nightly

### 4.6 — Advanced Deployment 🏗️

- [ ] 🟡 **Kubernetes Helm chart** — for orgs with k8s infrastructure
- [ ] 🟡 **ARM64 Docker images** — for Raspberry Pi / ARM VPS deployments
- [ ] 🟡 **Nix flake** — reproducible development environment
- [ ] 🟡🔌 **Reverse proxy options** — document configs for:
  - **Caddy** (recommended, auto-HTTPS)
  - **Traefik** (Docker-native)
  - **Nginx** (traditional)
  - **HAProxy** (high-performance)

### Success Criteria — Phase 4

- [ ] ≥5 external community PRs merged
- [ ] ≥3 language translations contributed
- [ ] Handles 10,000-ticket event without saturation
- [ ] Plugin API allows custom payment provider with zero core code changes
- [ ] Demo instance publicly accessible

---

## Dependency Audit — Post-PR #4 Status

### ✅ Correct & Current (Post-PR #4)

| Package | Version | Status | Notes |
|---|---|---|---|
| Next.js | `16.1.7` | ✅ | CVEs patched |
| React | `^19.2.4` | ✅ | Major bump from 18 |
| eslint-config-next | `16.1.7` | ✅ | Now matches Next.js |
| tRPC | `^11.13.4` | ✅ | Stable release (was RC) |
| Prisma | `^7.5.0` | ⚠️ | **Requires ESM migration** — see Phase 0.2 |
| Zod | `^4.3.6` | ⚠️ | **Requires breaking change audit** — see Phase 0.3 |
| Stripe | `^20.4.1` | ✅ | |
| Vite (scanner) | `^8.0.0` | ✅ | Major bump |
| react-router-dom | `^7.13.1` | ⚠️ | Major API changes from v6; scanner app needs router migration |
| Pino | `^10.3.1` | ✅ | Major bump |
| TypeScript | `^5.9.3` | ✅ | |
| Turbo | `^2.8.17` | ✅ | |

### ⚠️ Needs Attention

| Package | Issue | Action |
|---|---|---|
| `lucia` `^3.2.2` | **Deprecated March 2025** | Remove in Phase 1; replace with oslo/arctic/better-auth |
| `@lucia-auth/adapter-prisma` `^4.0.1` | Deprecated with Lucia | Remove in Phase 1 |
| `resend` `^6.9.4` | **Vendor lock-in** — only email option | Implement `EmailProvider` interface (Phase 1); keep as one adapter among many |
| `oslo` `^1.2.1` | Good — same author as Lucia | Promote to primary auth utility |
| ESLint `^8.57.1` | **EOL** — ESLint 9+ uses flat config | Migrate in Phase 3 |
| Tailwind `^3.4.19` | v4 available with CSS-first config | Migrate in Phase 3 |
| `@hookform/resolvers` `^5.2.2` | Bumped for Zod v4 | Verify compatibility with `zod@^4.3.6` |
| `react-email` `^5.2.10` | Used for template rendering | Keep — works regardless of email transport |
| `ioredis` `^5.10.0` | Client library | Works with Valkey unmodified ✅ |
| `pnpm` `9.15.9` | Consider pnpm 10.x | Evaluate in Phase 3 |
| `html5-qrcode` `^2.3.8` | Scanner app | Check for maintained fork; last release may be stale |
| `@react-pdf/renderer` `^4.3.2` | PDF generation | Verify React 19 peerDep compatibility |

### 🆕 Dependencies to Add

| Package | Purpose | Phase | License |
|---|---|---|---|
| `nodemailer` | SMTP email adapter | 1 | MIT |
| `@aws-sdk/client-ses` | AWS SES email adapter | 1 | Apache-2.0 |
| `@prisma/adapter-pg` | Required for Prisma 7 | 0 | Apache-2.0 |
| `pg` | PostgreSQL driver for Prisma 7 | 0 | MIT |
| `arctic` | OAuth provider library (auth) | 1–2 | MIT |
| `@paypal/paypal-server-sdk` | PayPal payment adapter | 1 | Apache-2.0 |
| `@mollie/api-client` | Mollie payment adapter | 1 | MIT |
| `sharp` | Image resize/optimise for uploads | 2 | Apache-2.0 |
| `next-intl` | i18n framework | 4 | MIT |
| `tiptap` (or `@tiptap/react`) | Rich text editor for event descriptions | 2 | MIT |
| `@opentelemetry/*` | Distributed tracing | 3 | Apache-2.0 |
| `@sentry/node` (optional) | Error tracking adapter | 3 | MIT |
| `axe-core` + `@axe-core/playwright` | Accessibility testing | 0–3 | MPL-2.0 |

### 🗑️ Dependencies to Remove

| Package | Reason |
|---|---|
| `lucia` | Deprecated March 2025 |
| `@lucia-auth/adapter-prisma` | Deprecated with Lucia |
| `implementation_plan.md.resolved` | Alien file (not a dep, but should be deleted) |

---

## Provider Matrix — Complete Reference

Every integration point has multiple options:

| Category | Provider | License | Self-Hosted | Config Key | Phase |
|---|---|---|---|---|---|
| **Payment** | Stripe | Proprietary | No | `stripe` | 1 |
| | PayPal | Proprietary | No | `paypal` | 1 |
| | Mollie | Proprietary | No | `mollie` | 1 |
| | Zeffy | Proprietary | No | `zeffy` | 1 |
| | GoCardless | Proprietary | No | `gocardless` | 1 |
| | Manual/Free | N/A | Yes | `manual` | 1 |
| | Lago (billing) | AGPL-3.0 | Yes | `lago` | 4 |
| **Email** | SMTP (any server) | N/A | Yes | `smtp` | 1 |
| | Resend | Proprietary | No | `resend` | 1 |
| | AWS SES | Proprietary | No | `ses` | 1 |
| | Postal | MIT | Yes | `postal` | 1 |
| | Console (dev) | N/A | Yes | `console` | 1 |
| **Storage** | MinIO (S3-compatible) | AGPL-3.0 | Yes | `minio` | 0 |
| | AWS S3 | Proprietary | No | `s3` | 1 |
| | Local filesystem | N/A | Yes | `local` | 1 |
| | Garage | AGPL-3.0 | Yes | `garage` | 1 |
| **Cache/Queue** | Valkey | BSD-3-Clause | Yes | (default) | 0 |
| **Error Tracking** | GlitchTip | MIT | Yes | `glitchtip` | 3 |
| | Sentry | BSL | Both | `sentry` | 3 |
| | Highlight.io | Apache-2.0 | Yes | `highlight` | 3 |
| | None | — | — | `none` | 0 |
| **Analytics** | Plausible | AGPL-3.0 | Yes | `plausible` | 4 |
| | Umami | MIT | Yes | `umami` | 4 |
| | PostHog | MIT | Yes | `posthog` | 4 |
| | None (default) | — | — | `none` | 0 |
| **Notifications** | Email (via provider) | — | — | (default) | 1 |
| | Slack | Proprietary | No | `slack` | 2 |
| | ntfy | Apache-2.0/GPL | Yes | `ntfy` | 2 |
| | Gotify | MIT | Yes | `gotify` | 2 |
| **Mailing List** | Listmonk | AGPL-3.0 | Yes | `listmonk` | 4 |
| | Mailchimp | Proprietary | No | `mailchimp` | 4 |
| **Reverse Proxy** | Caddy | Apache-2.0 | Yes | (recommended) | 3 |
| | Traefik | MIT | Yes | (docs) | 4 |
| | Nginx | BSD-2 | Yes | (docs) | 4 |

---

## Architecture Decision Records

### ADR-001: Provider-Agnostic Architecture
- **Decision:** Every external service is accessed through an adapter interface
- **Rationale:** GatherTix serves non-profits globally. A French org needs Mollie + self-hosted SMTP. A US org wants Stripe + Resend. A privacy-maximalist wants local storage + console email. All should work from the same codebase with only environment variable changes.
- **Consequence:** Slightly more initial engineering work, but massive long-term flexibility and true self-hosting capability.

### ADR-002: Valkey over Redis
- **Decision:** Use Valkey 8.x (already in docker-compose ✅)
- **Rationale:** Redis moved to SSPL/RSAL — not OSI-approved. Valkey is BSD-3-Clause under Linux Foundation governance.
- **Consequence:** Drop-in replacement. `ioredis` client works unchanged. Rename env vars from `REDIS_URL` to `VALKEY_URL` for clarity.

### ADR-003: Auth Strategy Post-Lucia
- **Decision:** Replace Lucia with `oslo` primitives + custom session management
- **Rationale:** Same author, actively maintained. Gives us full control over session cookies, token generation, and password hashing without depending on a deprecated framework.
- **Consequence:** More code to maintain, but zero dependency on any auth framework's release cycle.

### ADR-004: Prisma 7 ESM-Only
- **Decision:** Embrace ESM throughout the monorepo
- **Rationale:** Prisma 7 requires it. TypeScript 5.9+ supports it well. All major deps support ESM.
- **Consequence:** All packages need `"type": "module"`. Import paths need file extensions or bundler-compatible resolution.

---

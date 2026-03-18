# Phase 0 Review — Iteration 1
**Date:** 2026-03-18  
**Ralph Loop:** Iteration 1 of 10  
**Task:** Review Phase 0 of ROADMAP.md item by item, rate with highest severity, document learnings and fixes

---

## Executive Summary

This document provides a comprehensive security and architectural review of Phase 0 — Foundation Stability & Architecture from the GatherTix ROADMAP.md. Each item is analyzed for severity, implementation status, and potential risks.

---

## Phase 0.1 — Repository Restructure 🏗️

### Item 1: Flatten the `boilerplate/` nesting
- **Severity:** 🔴 **CRITICAL**
- **Status:** ❌ Not Done
- **Risk:** GitHub Actions cannot run, project structure is confusing, deployment pipelines broken
- **Finding:** The entire application lives nested inside `boilerplate/` directory. This is a template artifact that was never cleaned up.
- **Impact:** 
  - CI/CD workflows in `.github/workflows/` won't execute (wrong path)
  - Root `package.json` is a placeholder, not the real application
  - Docker compose files reference wrong paths
- **Recommendation:** Immediate restructure required before any other development

### Item 2: Move CI workflows
- **Severity:** 🔴 **CRITICAL**
- **Status:** ❌ Not Done
- **Risk:** No automated testing, linting, or deployment
- **Finding:** Workflows likely nested in `boilerplate/.github/workflows/`
- **Recommendation:** Relocate to root `.github/workflows/` as part of restructure

### Item 3: Move docs to `docs/`
- **Severity:** 🟠 **HIGH**
- **Status:** ❌ Not Done
- **Risk:** Repository clutter, confusing navigation
- **Finding:** Audit files scattered at root level
- **Recommendation:** Create `docs/` directory, move `audit-*.md`, `INDEX.md`

### Item 4: Remove `implementation_plan.md.resolved`
- **Severity:** 🟠 **HIGH**
- **Status:** ❌ Not Done
- **Risk:** Confusion, alien code from different project (`turbo-octo-robot` FastAPI CRM)
- **Finding:** This file is from a completely different project template
- **Recommendation:** Delete immediately

### Item 5: Move templates
- **Severity:** 🟠 **HIGH**
- **Status:** ❌ Not Done
- **Risk:** Inconsistent organization, unclear asset locations
- **Finding:** `email-templates/`, `landing-pages/`, `ticket-templates/`, `design-tokens.css`, SVGs scattered
- **Recommendation:** Consolidate into `docs/design/` or appropriate packages

### Item 6: Root README rewrite
- **Severity:** 🟠 **HIGH**
- **Status:** ❌ Not Done
- **Risk:** Poor first impression, unclear project purpose
- **Finding:** Current README is 34-byte placeholder with `yourusername/ticketing-platform` references
- **Recommendation:** Write comprehensive README with architecture overview, quick start, philosophy

---

## Phase 0.2 — Prisma 7 Schema & Database Foundation 🏗️

### Item 1: Create `schema.prisma`
- **Severity:** 🔴 **CRITICAL**
- **Status:** ❌ Not Done
- **Risk:** No database layer, no data model
- **Finding:** Schema file missing entirely
- **Required Models:**
  - Organization, User, Session
  - Event, TicketType, Order, Ticket
  - WebhookEndpoint, WebhookDelivery
- **Recommendation:** Create complete schema before any API development

### Item 2: Prisma 7 ESM migration
- **Severity:** 🔴 **CRITICAL**
- **Status:** ⚠️ Partially Done (PR #4 bumped to ^7.5.0)
- **Risk:** Application won't compile, imports broken
- **Required Changes:**
  - Generator: `prisma-client-js` → `prisma-client`
  - Install `@prisma/adapter-pg`
  - Set `"type": "module"` in database package
  - Create `prisma.config.ts`
  - Update all imports
- **Recommendation:** Complete migration before any database operations

### Item 3: Seed script
- **Severity:** 🟠 **HIGH**
- **Status:** ❌ Not Done
- **Risk:** Difficult local development, no test data
- **Recommendation:** Create `pnpm db:seed` with sample org, user (password: `gathertix`), event with 3 ticket types

---

## Phase 0.3 — Zod v4 Migration 🏗️

### Item 1: Zod v4 breaking changes audit
- **Severity:** 🔴 **CRITICAL**
- **Status:** ⚠️ Partially Done (PR #4 bumped to ^4.3.6)
- **Risk:** Runtime validation failures, type errors
- **Required Changes:**
  - `.nonstrict()` → `.passthrough()` / `.strict()` / `.strip()`
  - Update `.merge()` usage (throws on overlapping keys now)
  - Update error handling to new `ZodError` format
  - Replace `ZodSchema` generic with `ZodType`
  - Verify `@hookform/resolvers` v5.2.2 compatibility
  - Verify `fastify-type-provider-zod` v6.1.0 compatibility
- **Recommendation:** Run full typecheck and fix all Zod v4 breaking changes

---

## Phase 0.4 — Provider Interface Architecture 🔌

### Items 1-4: Define Provider Interfaces
- **Severity:** 🔴 **CRITICAL**
- **Status:** ❌ Not Done
- **Risk:** Vendor lock-in, inflexible architecture
- **Required Interfaces:**
  - `PaymentProvider` (Stripe, PayPal, Mollie, Zeffy, Manual)
  - `EmailProvider` (SMTP, Resend, SES, Postal)
  - `StorageProvider` (S3, MinIO, Local)
- **Finding:** No provider abstraction exists yet
- **Recommendation:** Define interfaces in `packages/shared/providers/` before implementing any concrete providers

### Item 5: Provider factory + config
- **Severity:** 🟠 **HIGH**
- **Status:** ❌ Not Done
- **Risk:** Configuration sprawl, hardcoded providers
- **Recommendation:** Create `createProviders(config)` factory reading from env vars

---

## Phase 0.5 — Security & Robustness 🔒

### Item 1: Webhook hex validation
- **Severity:** 🔴 **CRITICAL**
- **Status:** ✅ Done
- **Finding:** Already implemented per roadmap

### Item 2: Rate limiting on auth endpoints
- **Severity:** 🔴 **CRITICAL**
- **Status:** ❌ Not Done
- **Risk:** Brute force attacks on login/register/password-reset
- **Finding:** `@fastify/rate-limit` already in package.json (v10.3.0) but not wired
- **Recommendation:** Implement 5 attempts per IP per 15 min immediately

### Item 3: CSRF protection
- **Severity:** 🔴 **CRITICAL**
- **Status:** ❌ Not Done
- **Risk:** Cross-site request forgery attacks
- **Required:** Validate `Origin` / `Referer` on all tRPC mutations, `SameSite=Strict` cookies
- **Recommendation:** Implement before any production deployment

### Item 4: Secrets audit
- **Severity:** 🔴 **CRITICAL**
- **Status:** ❌ Not Done
- **Risk:** Credential leakage, default passwords in production
- **Finding:** `.env.example` still has defaults, "Redis" naming (should be "Valkey")
- **Recommendation:** Remove ALL defaults, fail fast at startup, rename to Valkey

### Item 5: Content-Security-Policy header
- **Severity:** 🟠 **HIGH**
- **Status:** ❌ Not Done
- **Risk:** XSS attacks, data injection
- **Recommendation:** Configure via `next.config.ts` or `@fastify/helmet`

### Item 6: Dependency update: Next.js → 16.1.7
- **Severity:** 🟠 **HIGH**
- **Status:** ✅ Done (PR #4)
- **Finding:** Patches CVE-2026-27977/78/79/80, CVE-2026-29057

### Item 7: eslint-config-next alignment
- **Severity:** 🟠 **HIGH**
- **Status:** ✅ Done (PR #4)

### Item 8: Argon2id confirmation
- **Severity:** 🟠 **HIGH**
- **Status:** ❌ Not Done (needs verification)
- **Finding:** `argon2` ^0.44.0 installed but variant not confirmed
- **Required:** Argon2id, ≥64MB memory, ≥3 iterations, ≥4 parallelism
- **Recommendation:** Verify configuration in auth code

### Item 9: Lucia Auth deprecation plan
- **Severity:** 🔴 **CRITICAL**
- **Status:** ❌ Not Done (decision pending)
- **Risk:** Using deprecated library (Lucia deprecated March 2025)
- **Options:**
  - A: `oslo` + `arctic` (same author, maintained, MIT)
  - B: `better-auth` (actively maintained, self-hosted)
  - C: Custom session management using `oslo` primitives
- **Recommendation:** **Decision required by end of Phase 0.** Implement in Phase 1.

---

## Phase 0.6 — CSS & Design System

### Items 1-2: Refactor TicketSelector.tsx, EventHero.tsx
- **Severity:** 🟠 **MEDIUM**
- **Status:** ✅ Done

### Item 3: Self-host fonts
- **Severity:** 🟠 **MEDIUM**
- **Status:** ✅ Done (Outfit + Plus Jakarta Sans via @fontsource)

### Item 4: Resolve font inconsistency
- **Severity:** 🟡 **LOW**
- **Status:** ❌ Not Done
- **Finding:** `audit-design.md` specifies **Inter**; codebase uses **Outfit + Plus Jakarta Sans**
- **Recommendation:** Pick one canonical source, update `design-tokens.css`

---

## Phase 0.7 — Branding & Icons

### Item 1: SVG icon redesign
- **Severity:** 🟡 **LOW**
- **Status:** ✅ Done

### Item 2: App metadata
- **Severity:** 🟡 **LOW**
- **Status:** ✅ Done

### Item 3: favicon.ico
- **Severity:** 🟡 **LOW**
- **Status:** ❌ Not Done
- **Required:** 32×32 `.ico`, 180×180 Apple touch icon, 192×192 and 512×512 PWA icons
- **Recommendation:** Generate from existing `icon.svg`

### Item 4: OpenGraph / Twitter card images
- **Severity:** 🟡 **LOW**
- **Status:** ❌ Not Done
- **Required:** `og-image.png` (1200×630)
- **Recommendation:** Generate for social sharing

---

## Phase 0.8 — Test Coverage Baseline 🧪

### Items 1-5: Test Coverage
- **Severity:** 🟠 **HIGH**
- **Status:** ❌ Not Done
- **Required Tests:**
  - `ZeffyPaymentProvider.handleWebhook` (valid, invalid, odd-hex, missing header, bad JSON, length mismatch)
  - `TicketSelector` (quantity ±, sliding scale, donation chips, $0 disabled, custom donation)
  - `EventHero` (with/without image, with/without tagline, CTA disabled)
  - Provider factory (correct adapter instantiation)
  - CI pipeline (typecheck, lint, test)
- **Recommendation:** Implement before Phase 1

---

## Critical Security Findings

### 🔴 CRITICAL: Multiple Security Gaps

1. **No Rate Limiting** — Auth endpoints vulnerable to brute force
2. **No CSRF Protection** — State-changing mutations unprotected
3. **Deprecated Auth Library** — Lucia Auth deprecated March 2025
4. **Secrets in .env.example** — Potential credential leakage
5. **No CSP Headers** — XSS vulnerability

### 🔴 CRITICAL: Architecture Blockers

1. **Repository Structure** — `boilerplate/` nesting prevents CI/CD
2. **No Database Schema** — Cannot build any data-driven features
3. **No Provider Interfaces** — Cannot implement payment/email/storage without vendor lock-in
4. **Zod v4 Migration Incomplete** — Type errors and runtime failures likely
5. **Prisma 7 ESM Migration Incomplete** — Import paths broken

---

## Learnings

### Architecture Patterns

1. **Provider Pattern is Essential** — GatherTix's core value proposition is self-hosting flexibility. Every external service (payments, email, storage) MUST be behind an adapter interface.

2. **ESM Migration Complexity** — Prisma 7 + Zod 4 + Next.js 16 simultaneous upgrades create cascading breaking changes. Should have been sequential.

3. **Security First** — Phase 0 correctly prioritizes security (rate limiting, CSRF, CSP, Argon2id) before features. This is the right order.

### Process Observations

1. **Template Artifacts** — The `boilerplate/` nesting and `implementation_plan.md.resolved` from a different project suggest this was scaffolded from a template and never properly initialized.

2. **Documentation Drift** — `audit-design.md` specifies Inter, but code uses Outfit + Jakarta Sans. Documentation must be kept in sync with implementation.

3. **Dependency Management** — Multiple critical dependencies (Lucia, Prisma, Zod) are in transition states. Need a dedicated migration sprint.

---

## Recommended Fixes — Priority Order

### Immediate (Block Phase 1)

1. **Repository Restructure** — Flatten `boilerplate/`, move workflows, clean docs
2. **Create Prisma Schema** — Define complete data model
3. **Complete Prisma 7 ESM Migration** — Fix imports, adapters, config
4. **Complete Zod v4 Migration** — Fix breaking changes
5. **Define Provider Interfaces** — Payment, Email, Storage
6. **Implement Rate Limiting** — On all auth endpoints
7. **Add CSRF Protection** — On tRPC mutations
8. **Decide Lucia Migration** — Choose oslo/better-auth/custom
9. **Secrets Audit** — Remove defaults from `.env.example`

### High Priority (Before Production)

10. **Seed Script** — For local development
11. **CSP Headers** — XSS protection
12. **Verify Argon2id** — Confirm configuration
13. **Provider Factory** — Config-based instantiation
14. **Test Coverage** — Baseline unit tests

### Medium Priority (Quality of Life)

15. **Font Consistency** — Resolve Inter vs Outfit/Jakarta
16. **Favicon Generation** — From icon.svg
17. **OpenGraph Images** — For social sharing

---

## Next Steps — Iteration 2

1. **Verify current repository structure** — Confirm `boilerplate/` nesting exists
2. **Check for existing Prisma schema** — May exist but not at expected path
3. **Audit current auth implementation** — Confirm Lucia usage and version
4. **Review `.env.example`** — Identify hardcoded defaults
5. **Check CI workflow locations** — Confirm `.github/workflows/` status

---

**Iteration:** 1/10  
**Next:** Continue verification and begin implementing critical fixes  
**Completion Promise:** `PHASE0_REVIEW_COMPLETE`

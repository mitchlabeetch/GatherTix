# OpenTickets - Complete Open Source Ticketing Platform

> **A comprehensive, libre-software audit and development foundation for a self-hosted ticketing platform designed for non-profits and small event teams.**

---

## 📋 Executive Summary

This repository contains a complete open source/libre software audit and development foundation for building **OpenTickets** - a lightweight, self-hosted ticketing platform designed specifically for:

- Non-profit organizations
- Community groups
- Small event teams (<500 tickets/event)
- Organizations seeking data sovereignty

### Key Principles

| Principle | Implementation |
|-----------|----------------|
| **Open Source** | MIT License, all dependencies evaluated for software freedom |
| **Self-Hosted** | Single VPS deployment, full data control |
| **Non-Profit Focused** | Minimized fees, accessible design, community values |
| **Easy Setup** | Docker-based deployment, comprehensive documentation |
| **Accessible** | WCAG 2.1 AA compliant, inclusive design |

---

## 📁 Repository Structure

```
/mnt/okcomputer/output/
├── INDEX.md                          ← You are here (Master Index)
├── README-PLATFORM.md                ← Platform overview & quick start
│
├── AUDIT & RESEARCH
│   ├── audit-techstack.md            ← Complete libre software audit
│   ├── audit-payments.md             ← Payment provider research
│   ├── audit-design.md               ← Design system & branding
│   └── audit-documentation.md        ← User & developer docs
│
├── DESIGN SYSTEM
│   ├── design-tokens.css             ← 200+ CSS custom properties
│   └── email-templates/              ← 8 transactional email templates
│
├── DEVELOPMENT FOUNDATION
│   └── boilerplate/                  ← 124 files, production-ready
│       ├── apps/                     ← web, api, worker, scanner
│       ├── packages/                 ← database, ui, email, pdf
│       ├── docker/                   ← Docker configurations
│       └── .github/workflows/        ← CI/CD pipelines
│
└── TEMPLATES
    ├── landing-pages/                ← Event & checkout page templates
    └── ticket-templates/             ← PDF ticket layouts
```

---

## 🎯 Quick Navigation

### For Decision Makers

| Question | Go To |
|----------|-------|
| "Is this stack truly open source?" | [Tech Stack Audit](./audit-techstack.md) |
| "What are our payment options?" | [Payment Research](./audit-payments.md) |
| "What will this cost?" | [Payment Research - Fees Section](./audit-payments.md#executive-summary) |
| "How does this compare to Eventbrite?" | [Documentation - Getting Started](./audit-documentation.md) |

### For Developers

| Task | Go To |
|------|-------|
| "I want to start coding" | [Boilerplate README](./boilerplate/README.md) |
| "What's the database schema?" | [boilerplate/packages/database/](./boilerplate/packages/database/) |
| "How do I deploy this?" | [Docker Compose](./boilerplate/docker-compose.yml) |
| "What APIs are available?" | [API Documentation](./audit-documentation.md#api-documentation) |

### For Designers

| Task | Go To |
|------|-------|
| "What are the brand colors?" | [Design Tokens CSS](./design-tokens.css) |
| "What's our brand voice?" | [Design Audit - Brand Voice](./audit-design.md#1c-brand-voice--tone) |
| "Component design specs?" | [Design Audit - Components](./audit-design.md#3-component-design-principles) |

### For Event Organizers

| Task | Go To |
|------|-------|
| "How do I create an event?" | [User Guide - Event Creation](./audit-documentation.md#1b-event-creation-guide) |
| "How do I process refunds?" | [User Guide - Refunds](./audit-documentation.md#processing-refunds) |
| "How does check-in work?" | [User Guide - Check-in](./audit-documentation.md#1d-check-in-guide) |

---

## 🔍 Libre Software Audit Summary

### Overall Score: 7.5/10

The proposed stack achieves **90%+ software freedom** with recommended modifications:

| Component | Status | Action |
|-----------|--------|--------|
| Node.js 22 | ✅ Libre | Keep |
| Fastify 5.x | ✅ Libre | Keep |
| PostgreSQL 16 | ✅ Libre | Keep |
| **Redis 7.x** | ⚠️ SSPL | **Migrate to Valkey 8.x** |
| Next.js 15 | ✅ MIT | Monitor |
| **Lucia Auth 3.x** | ⚠️ Deprecated | **Plan migration** |
| Stripe | ❌ Proprietary | Accept (no libre alternative) |

### Critical Actions Required

1. **Replace Redis with Valkey** (drop-in replacement, BSD-3-Clause)
2. **Plan Lucia Auth migration** (deprecated March 2025)
3. **Accept Stripe for payments** (no practical libre alternative)

[Full Audit →](./audit-techstack.md)

---

## 💳 Payment Provider Recommendations

### Top Recommendations by Use Case

| Use Case | Provider | Nonprofit Rate | Why |
|----------|----------|----------------|-----|
| **Best Overall** | Stripe | 2.2% + $0.30 (US) | Excellent API, global reach |
| **Best for EU** | Mollie | 1.8% + €0.25 | Local methods, PSD2 compliant |
| **Best In-Person** | SumUp | 1.49% (charities) | Cheap hardware, simple |
| **Best Recurring** | GoCardless | 0.75% + fee | Direct Debit specialist |
| **Lowest Fees** | PayPal | 1.99% + $0.49 | Brand recognition |

### Regional Winners

| Region | Primary | Secondary |
|--------|---------|-----------|
| **United States** | Stripe (2.2%) | PayPal (1.99%) |
| **European Union** | Mollie (1.8%) | Stripe (1.2%) |
| **United Kingdom** | Stripe (1.2%) | GoCardless (0.75%) |
| **Canada** | Stripe (2.2%) | PayPal (negotiable) |
| **Australia** | Stripe (1.4%) | GoCardless (BECS) |

[Full Payment Research →](./audit-payments.md)

---

## 🎨 Brand Identity

### Recommended Names (Top 5)

| Rank | Name | Domain | Rationale |
|------|------|--------|-----------|
| 1 | **Gather** | gather-tix.org | Warm, community-focused |
| 2 | **OpenPass** | openpass.io | Clear purpose, tech-forward |
| 3 | **Commons** | commonstix.org | Shared resource message |
| 4 | **EventKit** | eventkit.io | Practical toolkit metaphor |
| 5 | **LibreTix** | libretix.org | Open source emphasis |

### Brand Voice

- **Welcoming** - Like a friendly neighbor
- **Helpful** - Anticipates needs proactively
- **Transparent** - Clear about limitations
- **Empowering** - Builds user confidence
- **Approachable** - No jargon, human language

[Full Design System →](./audit-design.md)

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 22+ (for development)
- pnpm (package manager)
- Git

### 5-Minute Setup

```bash
# 1. Clone the boilerplate
cd /mnt/okcomputer/output/boilerplate

# 2. Copy environment file
cp .env.example .env
# Edit .env with your settings

# 3. Start infrastructure
docker-compose up -d db redis minio

# 4. Install dependencies
pnpm install

# 5. Run database migrations
pnpm db:migrate

# 6. Start development server
pnpm dev

# 7. Open http://localhost:3000
```

[Full Setup Guide →](./boilerplate/README.md)

---

## 📊 Feature Matrix

| Feature | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|---------|---------|---------|---------|---------|
| **Core** | | | | |
| Auth & Organizations | ✅ | ✅ | ✅ | ✅ |
| Event CRUD | ✅ | ✅ | ✅ | ✅ |
| Ticket Types | ✅ | ✅ | ✅ | ✅ |
| Order Management | ✅ | ✅ | ✅ | ✅ |
| **Payments** | | | | |
| Stripe Integration | ✅ | ✅ | ✅ | ✅ |
| PayPal Integration | | | ✅ | ✅ |
| Multi-provider | | | ✅ | ✅ |
| **Tickets** | | | | |
| QR Generation | ✅ | ✅ | ✅ | ✅ |
| PDF Generation | ✅ | ✅ | ✅ | ✅ |
| Email Delivery | ✅ | ✅ | ✅ | ✅ |
| **Experience** | | | | |
| Landing Page Builder | | ✅ | ✅ | ✅ |
| Email Templates | | ✅ | ✅ | ✅ |
| Custom Branding | | | ✅ | ✅ |
| Subdomains | | | ✅ | ✅ |
| **Operations** | | | | |
| Check-in App | ✅ | ✅ | ✅ | ✅ |
| Stats Dashboard | | ✅ | ✅ | ✅ |
| Refund Management | | | ✅ | ✅ |
| Guest Management | | | ✅ | ✅ |
| **Automation** | | | | |
| Reminder Emails | | | | ✅ |
| Daily Digests | | | | ✅ |
| Data Exports | | | | ✅ |

---

## 🏗️ Architecture Overview

### Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  Next.js 15 (App Router) + React + TypeScript               │
│  Tailwind CSS + shadcn/ui + Framer Motion                   │
└───────────────────────┬─────────────────────────────────────┘
                        │ tRPC / REST
┌───────────────────────▼─────────────────────────────────────┐
│                         API                                  │
│  Fastify 5 + tRPC + Zod Validation                          │
│  Lucia Auth (deprecated - plan migration)                   │
└───────────────────────┬─────────────────────────────────────┘
                        │ Prisma ORM
┌───────────────────────▼─────────────────────────────────────┐
│                      DATABASE                                │
│  PostgreSQL 16 (primary)                                    │
│  Valkey 8.x (cache/queue - Redis alternative)               │
│  MinIO (file storage)                                       │
└─────────────────────────────────────────────────────────────┘
```

### Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USERS                                │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTPS
┌───────────────────────▼─────────────────────────────────────┐
│                        CADDY                                 │
│              (Reverse Proxy + Auto HTTPS)                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Next.js    │ │   Fastify    │ │   Worker     │
│   (Web App)  │ │   (API)      │ │   (Jobs)     │
└──────────────┘ └──────────────┘ └──────────────┘
        │               │               │
        └───────────────┼───────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ PostgreSQL   │ │   Valkey     │ │    MinIO     │
│   (Data)     │ │  (Cache)     │ │  (Files)     │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

## 📚 Documentation Index

### User Documentation

| Document | Description |
|----------|-------------|
| [Getting Started](./audit-documentation.md#1a-getting-started-guide) | 5-minute quick start |
| [Event Creation](./audit-documentation.md#1b-event-creation-guide) | Creating your first event |
| [Order Management](./audit-documentation.md#1c-order-management) | Refunds, exports, guest lists |
| [Check-in Guide](./audit-documentation.md#1d-check-in-guide) | On-site ticket scanning |
| [Settings](./audit-documentation.md#1e-settings--configuration) | Organization configuration |

### Developer Documentation

| Document | Description |
|----------|-------------|
| [Installation](./audit-documentation.md#installation-guide) | System requirements & setup |
| [API Reference](./audit-documentation.md#api-documentation) | Authentication & endpoints |
| [Customization](./audit-documentation.md#customization-guide) | Theming & templates |
| [Deployment](./audit-documentation.md#deployment-guide) | Production checklist |
| [Troubleshooting](./audit-documentation.md#troubleshooting-guide) | Common issues & solutions |

### FAQ

[60+ Questions Answered →](./audit-documentation.md#8-faq-document)

---

## 🛡️ Security & Compliance

### Security Features

| Layer | Implementation |
|-------|----------------|
| Authentication | Session-based with Argon2id hashing |
| Authorization | Role-based (admin, org user) |
| Rate Limiting | Redis/Valkey-based per IP/user |
| CSRF Protection | Double-submit cookie pattern |
| XSS Prevention | React escaping + CSP headers |
| SQL Injection | Prisma ORM (parameterized queries) |
| Payment Data | Never stored (PCI DSS compliant) |

### PCI Compliance

- **SAQ A Eligible** when using Stripe Checkout or PayPal
- No card data ever touches your servers
- Use hosted payment pages or iframes

[Full Security Details →](./audit-techstack.md#security-architecture)

---

## 🌍 Accessibility

### WCAG 2.1 AA Compliance

- ✅ Color contrast ratios documented
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Focus indicators
- ✅ Reduced motion support
- ✅ Semantic HTML structure

[Accessibility Specs →](./audit-design.md#5-accessibility-specifications)

---

## 📈 Success Criteria

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| API Response (p95) | <200ms | Prometheus |
| Page Load (p95) | <2s | Lighthouse |
| Checkout Completion | >85% | Analytics |
| Email Delivery | >99% | Provider stats |
| QR Scan Response | <500ms | Client timing |
| Uptime | 99.9% | Monitoring |

### Quality Gates

| Gate | Criteria |
|------|----------|
| Unit Tests | ≥80% coverage |
| E2E Tests | Critical paths covered |
| Security Scan | No high/critical vulnerabilities |
| Accessibility | WCAG 2.1 AA |

---

## 🤝 Contributing

We welcome contributions from the community!

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Submit code changes
- 🎨 Design improvements
- 🌍 Translations

[Contributing Guide →](./boilerplate/CONTRIBUTING.md)

---

## 📜 License

This project is licensed under the **MIT License**.

All dependencies have been evaluated for open source compatibility. See [Tech Stack Audit](./audit-techstack.md) for details.

```
MIT License

Copyright (c) 2026 OpenTickets Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

This project stands on the shoulders of open source giants:

- [Node.js](https://nodejs.org/) - Runtime
- [Fastify](https://fastify.io/) - Web framework
- [Prisma](https://prisma.io/) - ORM
- [PostgreSQL](https://postgresql.org/) - Database
- [Valkey](https://valkey.io/) - Cache (Redis alternative)
- [Next.js](https://nextjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Components

---

## 📞 Support

### Getting Help

1. **Documentation** - Start with the [User Guides](./audit-documentation.md)
2. **FAQ** - Check [60+ common questions](./audit-documentation.md#8-faq-document)
3. **Troubleshooting** - See [common issues](./audit-documentation.md#troubleshooting-guide)
4. **Community** - Open an issue on GitHub

### Commercial Support

For organizations needing professional assistance:

- Installation & setup
- Custom development
- Training & onboarding
- Ongoing maintenance

---

## 🗺️ Roadmap

### Phase 1: Core MVP (Weeks 1-4)
- ✅ Auth, orgs, events
- ✅ Stripe checkout
- ✅ QR tickets, PDF generation
- ✅ Confirmation emails

### Phase 2: Builders & UX (Weeks 5-8)
- Landing page builder
- Email template editor
- Enhanced dashboard
- Stats & KPIs

### Phase 3: Multi-provider (Weeks 9-11)
- PayPal integration
- Subdomain routing
- Manual orders/refunds
- i18n foundation

### Phase 4: Automation (Weeks 12-13)
- Reminder emails
- Data exports
- Security hardening
- Documentation

---

## 📊 Project Stats

| Metric | Count |
|--------|-------|
| Documentation Pages | 50+ |
| Email Templates | 8 |
| Landing Templates | 2 |
| Ticket Templates | 4 |
| Boilerplate Files | 124 |
| Design Tokens | 200+ |
| Payment Providers Researched | 15+ |
| Tech Dependencies Audited | 40+ |

---

*Last Updated: March 2026*  
*Version: 1.0.0*  
*Status: Ready for Development*

---

**Ready to build something amazing?** Start with the [Boilerplate README](./boilerplate/README.md) or dive into the [Tech Stack Audit](./audit-techstack.md).

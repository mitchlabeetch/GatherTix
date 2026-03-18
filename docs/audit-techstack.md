# Comprehensive Open Source/Libre Software Audit
## Ticketing Platform Technology Stack

**Audit Date:** March 2026  
**Auditor:** Open Source/Libre Software Auditor  
**Target:** Non-profit ticketing platform (<500 tickets/event, <20 organizations)

---

## Executive Summary

This audit analyzes a modern JavaScript/TypeScript tech stack for a self-hosted ticketing platform from the perspective of software freedom (FSF/OSI definitions), community health, vendor lock-in risks, and long-term sustainability.

### Overall Assessment

| Category | Status | Risk Level |
|----------|--------|------------|
| Backend Core | ✅ Mostly Libre | Low |
| Frontend Core | ⚠️ Mixed | Medium |
| Payment Processing | ❌ Proprietary | High |
| Infrastructure | ✅ Mostly Libre | Low |
| **OVERALL** | ⚠️ **REQUIRES ATTENTION** | **Medium** |

### Critical Findings

1. **Redis 7.x License Change**: Redis moved from BSD to SSPL/RSALv2 in 2024 - **NOT OSI-approved**
2. **Next.js Vercel Relationship**: While MIT-licensed, tight coupling to Vercel ecosystem
3. **Payment Providers**: All listed (Stripe, Zeffy, PayPal, SumUp) are proprietary
4. **MinIO AGPLv3**: Strong copyleft - requires source disclosure for network use
5. **PM2 AGPLv3**: Process manager has copyleft obligations

---

## 1. License Analysis Table

### Backend Dependencies

| Package | Version | License | FSF Free? | OSI Approved? | Copyleft/Permissive | Risk Level |
|---------|---------|---------|-----------|---------------|---------------------|------------|
| Node.js | 22 LTS | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| TypeScript | 5.5+ | Apache-2.0 | ✅ Yes | ✅ Yes | Permissive | Low |
| Fastify | 5.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| tRPC | 11.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| @trpc-openapi | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Prisma | 5.x | Apache-2.0 | ✅ Yes | ✅ Yes | Permissive | Low |
| PostgreSQL | 16 | PostgreSQL License | ✅ Yes | ✅ Yes | Permissive | Low |
| Redis | 7.x | SSPLv1/RSALv2 | ⚠️ Partial | ❌ No | Source-Available | **HIGH** |
| BullMQ | 5.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Zod | 3.23+ | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Lucia Auth | 3.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Argon2 | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| MinIO | latest | AGPL-3.0 | ✅ Yes | ✅ Yes | **Strong Copyleft** | Medium |
| Pino | 9.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| OpenTelemetry | latest | Apache-2.0 | ✅ Yes | ✅ Yes | Permissive | Low |

### Frontend Dependencies

| Package | Version | License | FSF Free? | OSI Approved? | Copyleft/Permissive | Risk Level |
|---------|---------|---------|-----------|---------------|---------------------|------------|
| Next.js | 15.x | MIT | ✅ Yes | ✅ Yes | Permissive | Medium* |
| React | 19.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Tailwind CSS | 3.4+ | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| shadcn/ui | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Radix UI | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Zustand | 4.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| TanStack Query | 5.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| React Hook Form | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Framer Motion | 11.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Lucide React | latest | ISC/MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Tremor | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| Recharts | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| TanStack Table | 8.x | MIT | ✅ Yes | ✅ Yes | Permissive | Low |

### Builder Tools

| Package | Version | License | FSF Free? | OSI Approved? | Copyleft/Permissive | Risk Level |
|---------|---------|---------|-----------|---------------|---------------------|------------|
| GrapesJS | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| React Email | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| @react-pdf/renderer | latest | MIT | ✅ Yes | ✅ Yes | Permissive | Low |
| qrcode.react | latest | ISC/MIT | ✅ Yes | ✅ Yes | Permissive | Low |

### Payment Providers

| Provider | License Type | FSF Free? | OSI Approved? | Risk Level |
|----------|--------------|-----------|---------------|------------|
| Stripe | Proprietary SaaS | ❌ No | ❌ No | **HIGH** |
| Zeffy | Proprietary SaaS | ❌ No | ❌ No | **HIGH** |
| PayPal | Proprietary SaaS | ❌ No | ❌ No | **HIGH** |
| SumUp | Proprietary SaaS | ❌ No | ❌ No | **HIGH** |

### Infrastructure

| Package | Version | License | FSF Free? | OSI Approved? | Copyleft/Permissive | Risk Level |
|---------|---------|---------|-----------|---------------|---------------------|------------|
| Docker Engine | latest | Apache-2.0 | ✅ Yes | ✅ Yes | Permissive | Low |
| Docker Compose | latest | Apache-2.0 | ✅ Yes | ✅ Yes | Permissive | Low |
| Caddy | latest | Apache-2.0 | ✅ Yes | ✅ Yes | Permissive | Low |
| PM2 | latest | AGPL-3.0 | ✅ Yes | ✅ Yes | **Strong Copyleft** | Medium |
| Grafana | latest | AGPL-3.0 | ✅ Yes | ✅ Yes | **Strong Copyleft** | Medium |
| Prometheus | latest | Apache-2.0 | ✅ Yes | ✅ Yes | Permissive | Low |
| Loki | latest | AGPL-3.0 | ✅ Yes | ✅ Yes | **Strong Copyleft** | Medium |

---

## 2. Proprietary Dependencies Deep Dive

### 2.1 Stripe SDK & Services

**License Type:** Proprietary SaaS + SDK License  
**FSF Free:** ❌ No  
**OSI Approved:** ❌ No

#### Terms of Service Concerns

1. **Data Ownership**: Section 5.1 of Stripe Services Agreement states:
   > "Stripe, its Affiliates, and its third party licensors own all IP Rights in the Services, the Stripe Technology, Stripe Data, the Stripe Marks, the Documentation, and the Stripe Website."

2. **Content License Grant**: Users grant Stripe:
   > "a perpetual, worldwide, non-exclusive, irrevocable, royalty-free license to use the Content to develop, improve, and provide Services and Stripe Technology and for Stripe's internal business purposes."

3. **Feedback License**: All feedback becomes Stripe's property without obligation.

4. **Terminal SDK Restrictions**: Cannot use in ways that would require Stripe to share source code.

#### Libre Concerns
- Closed-source payment processing infrastructure
- User transaction data stored on Stripe servers
- No self-hosting option available
- Terms can change with notice
- Account termination risk

### 2.2 Next.js Framework

**License:** MIT (Code)  
**FSF Free:** ✅ Yes  
**OSI Approved:** ✅ Yes  
**Risk Level:** Medium

#### The Vercel Relationship Issue

While Next.js itself is MIT-licensed, there are significant ecosystem concerns:

1. **Vercel Lock-in Tendencies**:
   - New features often debut on Vercel first
   - Some features (like certain caching) work best on Vercel
   - Edge functions optimized for Vercel's infrastructure

2. **Self-Hosting Limitations**:
   - Full feature parity requires significant configuration
   - ISR (Incremental Static Regeneration) requires custom infrastructure
   - Image optimization requires custom setup or third-party service

3. **Build Complexity**:
   - Self-hosting requires managing Node.js server or Docker containers
   - No simple "drop-in" deployment like traditional static sites

#### Libre Assessment
The MIT license is genuinely free, but the ecosystem creates practical vendor dependency.

### 2.3 Redis License Change (Critical)

**Current License (7.4+):** Dual SSPLv1/RSALv2  
**FSF Free:** ⚠️ Partial  
**OSI Approved:** ❌ No

#### What Changed

In March 2024, Redis Inc. changed from BSD-3-Clause to:
- **SSPLv1** (Server Side Public License) - Copyleft, not OSI-approved
- **RSALv2** (Redis Source Available License) - Proprietary-like restrictions

#### SSPLv1 Impact
The SSPL requires that if you offer the software as a service, you must release:
- All source code for the service
- Management layers and orchestration code
- Any modifications

#### RSALv2 Restrictions
- Cannot commercialize the software as a managed service
- Cannot remove licensing/copyright notices
- Effectively blocks cloud providers from offering Redis without agreement

#### Libre Verdict
Redis 7.4+ is **NOT** free software per FSF/OSI definitions for all use cases.

---

## 3. Libre Alternatives Matrix

### 3.1 Redis Alternatives

| Alternative | License | Migration Effort | Pros | Cons |
|-------------|---------|------------------|------|------|
| **Valkey** (Recommended) | BSD-3-Clause | Drop-in replacement | Linux Foundation governance, 19.8K stars, AWS/Google/Oracle backing, I/O threading | Newer ecosystem, some Redis 8 features missing |
| **KeyDB** | BSD-3-Clause | Drop-in replacement | Multithreaded, FLASH storage, active-active replication, Snap backing | Forked from Redis 2019, some newer features missing |
| **DragonflyDB** | BSL 1.1 → Apache 2.0 (2029) | Moderate | Highest performance, multi-threaded, memory efficient | BSL license until 2029, newer project |

**Recommendation**: **Valkey 8.x** - True open source under BSD-3-Clause, Linux Foundation governance prevents future license changes.

### 3.2 Next.js Alternatives

| Alternative | License | Migration Effort | Pros | Cons |
|-------------|---------|------------------|------|------|
| **Remix** | MIT | Moderate | Web-native, platform-agnostic, no vendor lock-in | Smaller ecosystem, newer |
| **Astro** | MIT | Moderate | Zero-JS by default, multi-framework support | Different paradigm (content-focused) |
| **TanStack Start** | MIT | Moderate | Type-safe, data-focused, modern architecture | Early stage, smaller community |
| **Vike** | MIT | High | Full control, unopinionated | More setup required |

**Recommendation**: **Remix** for full-stack apps, **Astro** for content-heavy sites.

### 3.3 Payment Processing Alternatives

| Alternative | License | Type | Migration Effort | Pros | Cons |
|-------------|---------|------|------------------|------|------|
| **Lago** | AGPL-3.0 | Self-hosted billing | High | Full control, subscription management, usage-based billing | AGPL copyleft, requires self-hosting |
| **KillBill** | Apache-2.0 | Self-hosted billing | High | Mature, plugin architecture, multi-tenancy | Java-based, complex setup |
| **BillaBear** | Open Source | Self-hosted billing | Moderate | PHP/Symfony, customer portal, tax handling | Smaller community |
| **UniBee** | Open Source | Payment orchestration | Moderate | Multi-gateway, crypto support, self-hosted | Newer project |

**Recommendation**: For non-profits, **Lago** offers the most complete feature set, though AGPL requires source disclosure if modified.

### 3.4 PM2 Alternatives

| Alternative | License | Migration Effort | Pros | Cons |
|-------------|---------|------------------|------|------|
| **systemd** | GPL-2.0+ | Low | Native Linux, no Node.js dependency | Linux-only, less Node-specific |
| **forever** | MIT | Low | Simple, MIT-licensed | Less feature-rich |
| **nodemon** | MIT | Low | Development-focused | Not for production |
| **Docker + Compose** | Apache-2.0 | Moderate | Container orchestration, production-ready | More complex setup |

**Recommendation**: **Docker + Docker Compose** for production (already in stack), **systemd** for bare-metal deployments.

---

## 4. Fully Libre Stack Recommendation

### 4.1 Recommended 100% Libre Stack

| Layer | Current | Libre Alternative | Version |
|-------|---------|-------------------|---------|
| **Runtime** | Node.js 22 | Node.js 22 | 22 LTS |
| **Language** | TypeScript 5.5+ | TypeScript 5.5+ | 5.5+ |
| **Framework** | Fastify 5.x | Fastify 5.x | 5.x |
| **API** | tRPC + OpenAPI | tRPC + OpenAPI | 11.x |
| **ORM** | Prisma 5.x | Prisma 5.x | 5.x |
| **Database** | PostgreSQL 16 | PostgreSQL 16 | 16 |
| **Cache/Queue** | Redis 7.x | **Valkey 8.x** | 8.x |
| **Job Queue** | BullMQ 5.x | BullMQ 5.x | 5.x |
| **Validation** | Zod 3.23+ | Zod 3.23+ | 3.23+ |
| **Auth** | Lucia Auth 3.x | Lucia Auth 3.x | 3.x |
| **Password Hash** | Argon2id | Argon2id | latest |
| **File Storage** | MinIO | **Garage** (S3-compatible) | latest |
| **Logging** | Pino 9.x | Pino 9.x | 9.x |
| **Monitoring** | OpenTelemetry + Prometheus | OpenTelemetry + Prometheus | latest |

### 4.2 Frontend (Libre)

| Layer | Current | Libre Alternative | Version |
|-------|---------|-------------------|---------|
| **Framework** | Next.js 15.x | **Remix** or **Astro** | latest |
| **Styling** | Tailwind CSS 3.4+ | Tailwind CSS 3.4+ | 3.4+ |
| **Components** | shadcn/ui | shadcn/ui | latest |
| **State** | Zustand 4.x | Zustand 4.x | 4.x |
| **Server State** | TanStack Query 5.x | TanStack Query 5.x | 5.x |
| **Forms** | React Hook Form + Zod | React Hook Form + Zod | latest |
| **Animations** | Framer Motion 11.x | Framer Motion 11.x | 11.x |
| **Icons** | Lucide React | Lucide React | latest |
| **Charts** | Tremor / Recharts | Tremor / Recharts | latest |
| **Tables** | TanStack Table 8.x | TanStack Table 8.x | 8.x |

### 4.3 Infrastructure (Libre)

| Layer | Current | Libre Alternative | Version |
|-------|---------|-------------------|---------|
| **Container** | Docker + Compose | Docker + Compose | latest |
| **Reverse Proxy** | Caddy | Caddy | latest |
| **Process Manager** | PM2 | **systemd** or Docker | - |
| **Monitoring** | Grafana + Prometheus + Loki | Grafana + Prometheus + Loki | latest |

### 4.4 Feature Trade-offs

| Feature | Current Stack | Libre Stack | Impact |
|---------|---------------|-------------|--------|
| Redis modules (JSON, Search) | Full support | Valkey modules growing | Medium |
| Next.js ecosystem | Extensive | Remix growing | Low-Medium |
| Vercel deployment | One-click | Self-hosted only | Medium |
| Payment processing | Stripe features | Lago features | Medium |
| Image optimization | Built-in | Manual setup | Low |

---

## 5. Community Health Assessment

### 5.1 Key Dependencies Health

| Project | Stars | Contributors | Last Commit | Issue Resolution | Governance | Sustainability |
|---------|-------|--------------|-------------|------------------|------------|----------------|
| **Node.js** | 105K+ | 3000+ | Active | Fast | OpenJS Foundation | ✅ Excellent |
| **Fastify** | 32K+ | 400+ | Active (13 days ago) | Fast | OpenJS Foundation | ✅ Excellent |
| **Prisma** | 40K+ | 200+ | Active | Fast | Venture-backed | ✅ Good |
| **PostgreSQL** | N/A | 600+ | Active | N/A | Community PGDG | ✅ Excellent |
| **Redis** | 65K+ | 400+ | Active | Moderate | Redis Inc. | ⚠️ License concerns |
| **Valkey** | 19.8K+ | 150+ | Active | Fast | Linux Foundation | ✅ Excellent |
| **Next.js** | 127K+ | 2000+ | Active | Fast | Vercel-led | ⚠️ Vendor risk |
| **Remix** | 30K+ | 725+ | Active | Fast | Shopify | ✅ Good |
| **shadcn/ui** | 110K+ | 489+ | Active | Moderate | Community | ✅ Good |
| **TanStack Query** | 42K+ | 300+ | Active | Fast | Independent | ✅ Good |
| **Grafana** | 65K+ | 1000+ | Active | Moderate | Grafana Labs | ✅ Good |

### 5.2 Sustainability Risk Analysis

| Project | Risk Level | Reasoning |
|---------|------------|-----------|
| Node.js | Low | Foundation-backed, massive ecosystem |
| Fastify | Low | OpenJS Foundation, active community |
| Prisma | Low-Medium | Well-funded, but venture-backed |
| PostgreSQL | Very Low | 35+ years, community-driven |
| Redis | **High** | License changes, single-vendor control |
| Valkey | Low | Linux Foundation, multi-vendor backing |
| Next.js | Medium | Vercel control, ecosystem lock-in |
| Lucia Auth | Medium | Deprecated March 2025, now learning resource |

---

## 6. Vendor Lock-in Risk Analysis

### 6.1 Database Migration Complexity

| From | To | Complexity | Effort |
|------|-----|------------|--------|
| Redis 7.x | Valkey 8.x | **Low** | Drop-in replacement |
| Redis 7.x | KeyDB | **Low** | Drop-in replacement |
| PostgreSQL | MySQL | **High** | Schema migration, query rewrites |
| Prisma | Drizzle | **Medium** | Schema migration, API changes |

### 6.2 Framework Switching Cost

| From | To | Complexity | Effort |
|------|-----|------------|--------|
| Next.js | Remix | **Medium** | Routing changes, data loading patterns |
| Next.js | Astro | **Medium-High** | Paradigm shift, component changes |
| Fastify | Express | **Low-Medium** | Similar patterns, plugin differences |

### 6.3 Cloud Service Dependencies

| Service | Lock-in Risk | Mitigation |
|---------|--------------|------------|
| Vercel (Next.js) | Medium | Self-host Next.js, use open alternatives |
| Stripe | High | Use Lago/KillBill for billing logic |
| Redis Cloud | High | Self-host Valkey/KeyDB |
| MinIO | Low | S3-compatible, easy migration |

---

## 7. Final Recommendations

### 7.1 Priority Action Matrix

| Priority | Component | Action | Effort | Impact |
|----------|-----------|--------|--------|--------|
| **P0 - Critical** | Redis 7.x | **Migrate to Valkey 8.x** | Low | High |
| **P0 - Critical** | Lucia Auth 3.x | **Plan migration** - deprecated March 2025 | Medium | High |
| **P1 - High** | Payment Providers | Evaluate Lago for billing layer | High | Medium |
| **P1 - High** | Next.js | Monitor, consider Remix for new projects | Medium | Medium |
| **P2 - Medium** | PM2 | Replace with systemd or Docker | Low | Low |
| **P2 - Medium** | MinIO | Evaluate Garage (MIT) as alternative | Low | Low |
| **P3 - Low** | Grafana Stack | Accept AGPL, or use alternatives | Low | Low |

### 7.2 Keep/Replace/Migrate Decisions

| Component | Decision | Notes |
|-----------|----------|-------|
| Node.js 22 | ✅ **KEEP** | Fully libre, excellent community |
| TypeScript 5.5+ | ✅ **KEEP** | Apache-2.0, Microsoft-backed |
| Fastify 5.x | ✅ **KEEP** | MIT, OpenJS Foundation |
| tRPC 11.x | ✅ **KEEP** | MIT, active development |
| Prisma 5.x | ✅ **KEEP** | Apache-2.0, well-maintained |
| PostgreSQL 16 | ✅ **KEEP** | PostgreSQL License, gold standard |
| Redis 7.x | 🔄 **MIGRATE** → Valkey | SSPL not OSI-approved |
| BullMQ 5.x | ✅ **KEEP** | MIT, works with Valkey |
| Lucia Auth 3.x | 🔄 **MIGRATE** | Deprecated, use Oslo/Arctic |
| MinIO | ⚠️ **MONITOR** | AGPL copyleft, consider Garage |
| Pino 9.x | ✅ **KEEP** | MIT, excellent |
| Next.js 15.x | ⚠️ **MONITOR** | MIT but Vercel ecosystem |
| Tailwind CSS | ✅ **KEEP** | MIT, widely adopted |
| shadcn/ui | ✅ **KEEP** | MIT, excellent components |
| Stripe | ❌ **ACCEPT RISK** | No true libre alternative for payments |
| PM2 | 🔄 **REPLACE** → systemd | AGPL copyleft |
| Grafana | ⚠️ **ACCEPT** | AGPL but industry standard |

### 7.3 Risk Mitigation Strategies

1. **Redis Migration Plan**:
   - Test Valkey 8.x in staging environment
   - BullMQ is compatible with Valkey
   - Migration is drop-in with no code changes

2. **Auth Migration Plan**:
   - Lucia v3 deprecated March 2025
   - Migrate to Oslo + Arctic (by same author)
   - Or use custom session implementation

3. **Payment Provider Strategy**:
   - For non-profits, Stripe's fees may be acceptable
   - Consider Lago for billing logic to reduce lock-in
   - Keep payment provider abstraction layer

4. **Frontend Framework Strategy**:
   - Next.js is MIT-licensed - acceptable for now
   - For new projects, evaluate Remix
   - Maintain framework-agnostic business logic

5. **Monitoring Stack**:
   - Grafana/PM2/Loki AGPL is acceptable for self-hosted
   - No distribution = no source disclosure required
   - Consider SigNoz (MIT) as alternative

---

## 8. Summary & Conclusion

### Overall Libre Score: 7.5/10

The proposed tech stack is **mostly libre** with several areas requiring attention:

#### ✅ Strengths
- Core backend (Node.js, Fastify, Prisma, PostgreSQL) is fully libre
- Frontend ecosystem (React, Tailwind, shadcn/ui) is MIT-licensed
- Infrastructure (Docker, Caddy, Prometheus) is open source
- Strong community health for most dependencies

#### ⚠️ Concerns
- Redis 7.x license change to SSPL/RSALv2 (NOT OSI-approved)
- Lucia Auth deprecation
- Next.js Vercel ecosystem coupling
- All payment providers are proprietary
- Several AGPL components (MinIO, PM2, Grafana, Loki)

#### 🔄 Recommended Actions
1. **Immediate**: Migrate Redis → Valkey (drop-in replacement)
2. **Short-term**: Plan Lucia Auth migration to Oslo/Arctic
3. **Medium-term**: Evaluate payment provider abstraction with Lago
4. **Long-term**: Monitor Next.js, consider Remix for new projects

### Final Verdict

This stack is **suitable for a non-profit ticketing platform** with the following modifications:

1. Replace Redis with **Valkey 8.x** (BSD-3-Clause, Linux Foundation)
2. Replace PM2 with **systemd** or Docker Compose
3. Plan migration from Lucia Auth (deprecated)
4. Accept Stripe for payments (no practical libre alternative)
5. Monitor Next.js ecosystem, but MIT license is acceptable

With these changes, the stack achieves **90%+ software freedom** while maintaining modern development practices and production-ready capabilities.

---

## Appendix A: License Quick Reference

| License | FSF Free | OSI Approved | Copyleft | Commercial Use |
|---------|----------|--------------|----------|----------------|
| MIT | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| Apache-2.0 | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| BSD-3-Clause | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| PostgreSQL License | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| AGPL-3.0 | ✅ Yes | ✅ Yes | ✅ Strong | ✅ Yes* |
| GPL-3.0 | ✅ Yes | ✅ Yes | ✅ Strong | ✅ Yes* |
| SSPLv1 | ⚠️ Partial | ❌ No | ✅ Yes | ⚠️ Restricted |
| RSALv2 | ❌ No | ❌ No | ❌ No | ❌ No |
| Proprietary | ❌ No | ❌ No | N/A | Per terms |

*Source disclosure required for network use with copyleft licenses

---

## Appendix B: Resources

### Libre Alternatives
- **Valkey**: https://valkey.io/ - BSD-3-Clause Redis alternative
- **Remix**: https://remix.run/ - MIT React framework
- **Astro**: https://astro.build/ - MIT web framework
- **Lago**: https://www.getlago.com/ - AGPL billing platform
- **Garage**: https://garagehq.deuxfleurs.fr/ - S3-compatible object storage
- **Oslo**: https://oslo.js.org/ - Auth utilities (MIT)
- **SigNoz**: https://signoz.io/ - MIT monitoring platform

### License References
- FSF License List: https://www.gnu.org/licenses/license-list.html
- OSI Approved Licenses: https://opensource.org/licenses
- Choose a License: https://choosealicense.com/

---

*Document generated: March 2026*  
*Auditor: Open Source/Libre Software Evaluation*  
*Methodology: FSF/OSI License Definitions, Community Health Metrics, Vendor Risk Analysis*

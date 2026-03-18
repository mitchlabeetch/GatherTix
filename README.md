# GatherTix

> Open-source, self-hosted event ticketing — zero platform fees.

GatherTix is a lightweight ticketing platform built for small events, community groups, and non-profits. Host it yourself, plug in your own payment processor, email service, and object storage — pay only infrastructure costs, never a per-ticket fee.

## Why GatherTix?

- **Zero platform fees** — Zeffy, Stripe, or any payment provider you configure
- **Self-hosted** — your data, your infrastructure, your rules
- **Provider-agnostic** — swap payment, email, and storage backends via env vars
- **AGPL-licensed** — free as in freedom

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 15, React 18, Tailwind CSS 3, shadcn/ui |
| API | Fastify 5, tRPC 11, Zod validation |
| Database | PostgreSQL 16, Prisma ORM |
| Cache/Queue | Valkey 8 (Redis-compatible), BullMQ |
| Storage | MinIO (S3-compatible) |
| Auth | oslo + custom sessions (Lucia migration planned) |
| PDF | Custom ticket generation |
| Email | Provider-agnostic (Resend, SES, SMTP) |
| Monorepo | Turborepo, pnpm workspaces |

## Quick Start

### Prerequisites

- Node.js ≥ 20
- pnpm ≥ 9
- Docker & Docker Compose

### Setup

```bash
git clone https://github.com/your-org/GatherTix.git
cd GatherTix
cp .env.example .env
pnpm install
docker compose up -d        # PostgreSQL, Valkey, MinIO
pnpm db:generate
pnpm db:migrate
pnpm dev                    # API on :3001, Web on :3000
```

## Architecture

```
apps/
  api/          Fastify REST + tRPC API server
  web/          Next.js frontend
  scanner/      QR code ticket scanner
  worker/       BullMQ background job processor
packages/
  database/     Prisma schema, migrations, client
  shared/       Zod schemas, types, constants
  email/        Email provider adapters
  pdf/          Ticket PDF generation
  ui/           Shared React components (shadcn/ui)
  eslint-config/
  tailwind-config/
  typescript-config/
```

## Provider-Agnostic Design

Every external service runs behind an adapter interface. Configure via environment variables:

```bash
# Payment
PAYMENT_PROVIDER=zeffy          # zeffy | stripe | free

# Email
EMAIL_PROVIDER=resend           # resend | ses | smtp | console

# Storage
STORAGE_PROVIDER=minio          # minio | s3 | local
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all packages and apps |
| `pnpm lint` | Lint all packages |
| `pnpm typecheck` | Type-check all packages |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run end-to-end tests |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run database migrations |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm db:seed` | Seed database |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## Roadmap

See [ROADMAP.md](ROADMAP.md) for the full development plan.

## License

AGPL-3.0-or-later — see [LICENSE](LICENSE).

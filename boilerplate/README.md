# Ticketing Platform

[![CI](https://github.com/yourusername/ticketing-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/ticketing-platform/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An open-source, self-hosted ticketing platform built with modern web technologies. Perfect for event organizers who want full control over their ticketing infrastructure.

## Features

- **Event Management**: Create and manage events with multiple ticket types
- **QR Code Tickets**: Secure ticket generation with QR codes for easy check-in
- **Payment Processing**: Integrated Stripe payment processing
- **Email Notifications**: Automated email confirmations and reminders
- **Check-in System**: Mobile-friendly ticket scanning and validation
- **Analytics Dashboard**: Track sales, attendance, and revenue
- **Multi-organization**: Support for multiple organizations per user
- **Role-based Access**: Granular permissions for team members
- **Webhook Support**: Integrate with external systems
- **API Access**: RESTful API for custom integrations

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Fastify 5, tRPC, TypeScript
- **Database**: PostgreSQL 16, Prisma ORM
- **Cache/Queue**: Redis 7, BullMQ
- **Storage**: MinIO (S3-compatible)
- **Authentication**: Lucia Auth with session-based auth
- **Email**: React Email, Resend
- **PDF Generation**: React PDF
- **Testing**: Vitest, Playwright
- **Deployment**: Docker, Docker Compose

## Quick Start

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker & Docker Compose (optional, for local development)

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/ticketing-platform.git
   cd ticketing-platform
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start services with Docker**

   ```bash
   docker-compose up -d
   ```

5. **Run database migrations**

   ```bash
   pnpm db:migrate
   ```

6. **Seed the database (optional)**

   ```bash
   pnpm db:seed
   ```

7. **Start development servers**

   ```bash
   pnpm dev
   ```

   The application will be available at:
   - Web: http://localhost:3000
   - API: http://localhost:3001
   - API Docs: http://localhost:3001/docs

### Docker Deployment

For production deployment using Docker:

1. **Copy and configure production environment**

   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Deploy with Docker Compose**

   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **Run database migrations**

   ```bash
   docker-compose -f docker-compose.prod.yml exec api pnpm --filter @ticketing/database db:migrate:prod
   ```

## Project Structure

```
ticketing-platform/
├── apps/
│   ├── web/              # Next.js 15 frontend
│   ├── api/              # Fastify API server
│   └── scanner/          # PWA ticket scanner (coming soon)
├── packages/
│   ├── database/         # Prisma schema + client
│   ├── shared/           # Shared types, utils, validations
│   ├── ui/               # Shared UI components (shadcn/ui)
│   ├── email/            # Email templates (React Email)
│   └── pdf/              # PDF generation (React PDF)
├── docker/               # Docker configurations
├── docs/                 # Documentation
├── e2e/                  # Playwright E2E tests
└── scripts/              # Utility scripts
```

## Available Scripts

```bash
# Development
pnpm dev              # Start all development servers
pnpm dev:web          # Start web only
pnpm dev:api          # Start API only

# Building
pnpm build            # Build all packages and apps

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run database migrations
pnpm db:studio        # Open Prisma Studio
pnpm db:seed          # Seed database with sample data

# Testing
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests
pnpm test:e2e:ui      # Run E2E tests with UI

# Linting & Formatting
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
pnpm format           # Format code with Prettier
```

## Configuration

### Environment Variables

See `.env.example` for all available configuration options.

Key variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `SESSION_SECRET` | Secret for session encryption | Yes |
| `STRIPE_SECRET_KEY` | Stripe API key | For payments |
| `RESEND_API_KEY` | Resend API key | For emails |
| `S3_ENDPOINT` | S3/MinIO endpoint | For file storage |

### Payment Configuration

To enable Stripe payments:

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Set `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY` in your `.env`
4. Configure webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

### Email Configuration

To enable email notifications:

1. Create a Resend account at https://resend.com
2. Get your API key from the Resend Dashboard
3. Set `RESEND_API_KEY` and `EMAIL_FROM` in your `.env`
4. Verify your domain in Resend

## API Documentation

API documentation is available at `/docs` when running the API server locally.

The API is built with tRPC and provides type-safe endpoints for:

- Authentication (`auth.*`)
- Organizations (`org.*`)
- Events (`event.*`)
- Tickets (`ticket.*`)
- Orders (`order.*`)
- Users (`user.*`)

## Testing

### Unit Tests

```bash
pnpm test
```

### E2E Tests

```bash
# Start development server first
pnpm dev

# Run E2E tests
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: https://docs.yourdomain.com
- Issues: https://github.com/yourusername/ticketing-platform/issues
- Discussions: https://github.com/yourusername/ticketing-platform/discussions

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucia Auth](https://lucia-auth.com/) for authentication
- [Prisma](https://prisma.io/) for the excellent ORM
- [tRPC](https://trpc.io/) for type-safe APIs

---

Made with ❤️ by the open-source community.

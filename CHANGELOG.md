# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup with monorepo structure
- Next.js 15 frontend with App Router
- Fastify 5 API server with tRPC
- Prisma ORM with PostgreSQL database
- Lucia Auth for session-based authentication
- Role-based access control (RBAC)
- Organization management
- Event creation and management
- Ticket type configuration
- Order processing system
- QR code ticket generation
- Check-in system with QR scanning
- Payment integration with Stripe
- Email notifications with Resend
- PDF ticket generation
- Docker development environment
- CI/CD pipeline with GitHub Actions
- Vitest unit testing setup
- Playwright E2E testing setup

### Security

- Argon2id password hashing
- Session-based authentication
- CSRF protection
- Rate limiting
- Input validation with Zod

## [0.1.0] - 2024-XX-XX

### Added

- Initial release
- Basic ticketing platform functionality
- User authentication and authorization
- Event management
- Ticket sales
- Order management

---

## Release Template

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes in existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Now removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```

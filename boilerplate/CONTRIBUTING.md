# Contributing to Ticketing Platform

Thank you for your interest in contributing to the Ticketing Platform! We welcome contributions from the community and are pleased to have you join us.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed and what behavior you expected**
- **Include screenshots if applicable**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the enhancement**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repository
2. Create a new branch from `main` for your feature or bug fix
3. Make your changes
4. Ensure your code follows our style guidelines
5. Add or update tests as necessary
6. Update documentation as needed
7. Submit a pull request

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm 9+
- Docker & Docker Compose

### Setting Up Your Environment

1. Fork and clone the repository

   ```bash
   git clone https://github.com/YOUR_USERNAME/ticketing-platform.git
   cd ticketing-platform
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Copy environment variables

   ```bash
   cp .env.example .env
   ```

4. Start the development services

   ```bash
   docker-compose up -d
   ```

5. Run database migrations

   ```bash
   pnpm db:migrate
   ```

6. Start the development server

   ```bash
   pnpm dev
   ```

## Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Enable strict mode in `tsconfig.json`
- Avoid using `any` type
- Use explicit return types for public functions

### Code Formatting

We use Prettier and ESLint to maintain code consistency:

```bash
# Format code
pnpm format

# Lint code
pnpm lint

# Type check
pnpm typecheck
```

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - A new feature
- `fix:` - A bug fix
- `docs:` - Documentation only changes
- `style:` - Changes that don't affect code meaning (formatting, etc.)
- `refactor:` - Code change that neither fixes a bug nor adds a feature
- `perf:` - Code change that improves performance
- `test:` - Adding or correcting tests
- `chore:` - Changes to build process or auxiliary tools

Example:

```
feat(auth): add password reset functionality

- Add password reset endpoint
- Send reset email with token
- Validate token and update password
```

### Branch Naming

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

## Testing

### Unit Tests

Write unit tests for all new functionality:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### E2E Tests

Write E2E tests for critical user flows:

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

### Test Coverage

- Aim for at least 80% code coverage
- Test both success and error cases
- Test edge cases and boundary conditions

## Database Migrations

When making changes to the Prisma schema:

1. Update the schema in `packages/database/prisma/schema.prisma`
2. Generate a migration:

   ```bash
   pnpm --filter @ticketing/database db:migrate --name your_migration_name
   ```

3. Review the generated migration file
4. Test the migration locally
5. Include the migration file in your PR

## Documentation

- Update the README.md if you change functionality
- Add JSDoc comments to public functions
- Update API documentation for endpoint changes
- Include examples in documentation

## Review Process

1. All pull requests require at least one review
2. CI checks must pass before merging
3. Address review feedback promptly
4. Squash commits before merging if requested

## Release Process

1. Maintainers will create release branches
2. Releases follow [Semantic Versioning](https://semver.org/)
3. Changelog is updated with each release

## Questions?

- Join our [Discord community](https://discord.gg/yourserver)
- Open a [GitHub Discussion](https://github.com/yourusername/ticketing-platform/discussions)
- Email us at [support@yourdomain.com](mailto:support@yourdomain.com)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Ticketing Platform! 🎉

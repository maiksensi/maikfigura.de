# Copilot Instructions for maikfigura.de

## Project Overview

This is the personal homepage of Maik Figura, built with Next.js. The site uses AsciiDoc files for content, which are converted to HTML at build time and sanitized before rendering.

## Tech Stack

- **Framework**: Next.js 16 with React 19 and TypeScript
- **Styling**: Tailwind CSS 4 with PostCSS
- **Content**: AsciiDoc files processed with Asciidoctor, sanitized with DOMPurify
- **Package Manager**: pnpm (≥10.0.0), Node ≥24.0.0
- **Unit Testing**: Vitest with Testing Library (React, jest-dom, user-event)
- **E2E Testing**: Playwright with Axe Core for accessibility
- **Linting**: ESLint with `eslint-config-next`
- **Formatting**: Prettier

## Code Style & Conventions

Follow the Prettier config in `.prettierrc.js`:

- No semicolons
- Single quotes
- 2-space indentation
- Trailing commas in ES5 positions
- Max line width: 100 characters

All code must pass `pnpm validate` (format check + lint + type-check) before merging.

## Project Structure

```
components/   React components (e.g. Navigation, Content, SEO, Loading)
content/      AsciiDoc (.adoc) page content files
e2e/          Playwright end-to-end tests
lib/          Shared utilities: config.ts (site metadata, nav pages), content.ts (AsciiDoc processing)
pages/        Next.js page routes
public/       Static assets
styles/       Global CSS
test/         Vitest setup and test utilities
```

## Adding Content

1. Create a new `.adoc` file in `/content/`
2. Add the page slug to `navPages` in `/lib/config.ts`
3. The page becomes automatically available at `/{slug}`

## Common Commands

```bash
pnpm dev          # Start development server (Turbopack)
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix ESLint issues
pnpm format       # Format with Prettier
pnpm type-check   # TypeScript type checking
pnpm test         # Run unit tests with Vitest
pnpm test:e2e     # Run Playwright E2E tests
pnpm validate     # Run all checks (format + lint + type-check)
```

## Testing Practices

- **Unit tests** live alongside components (e.g. `components/Navigation.test.tsx`) using Vitest + Testing Library
- **E2E tests** live in `/e2e/` using Playwright; they include accessibility checks via Axe Core
- Always add unit tests for new components
- Accessibility (`aria-*` attributes, focus management) is tested and expected in all interactive components

## Security

The site enforces strict security headers (CSP, HSTS, AI opt-out) defined in `next.config.ts`. When modifying headers or adding new external resources, update the CSP accordingly. HTML rendered from AsciiDoc is sanitized using DOMPurify with an allowlist of tags and attributes defined in `lib/content.ts`.

## Dependency Management

Renovate bot is configured (`.github/renovate.json`) to auto-merge minor/patch updates and run lock file maintenance on a monthly schedule. Do not manually update dependency versions unless necessary—let Renovate handle routine updates.

**Prefer pinned versions** for all dependencies (exact versions, not ranges). Use `"1.2.3"` instead of `"^1.2.3"` or `"~1.2.3"` to ensure reproducible installs and avoid unexpected breakage from upstream changes.

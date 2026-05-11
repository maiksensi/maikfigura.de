# Testing Strategy

This site is a small static-first Next.js application, so the harness should stay fast and focused on the surfaces visitors actually use.

## Project contract

- **Framework**: Next.js 16 with React 19 and TypeScript.
- **Styling**: Tailwind CSS 4 with PostCSS.
- **Content**: AsciiDoc files in `content/`, rendered with Asciidoctor and sanitized with DOMPurify in `lib/content.ts`.
- **Runtime**: Node `24.x`, matching the Vercel production setting.
- **Package manager**: pnpm 11, pinned through `packageManager` and constrained by `engines.pnpm`.

## Code conventions

Follow `.prettierrc.js`:

- No semicolons.
- Single quotes.
- 2-space indentation.
- ES5 trailing commas.
- Max line width: 100 characters.

All handoffs should pass `pnpm validate` before merge. Use exact dependency versions and let Renovate handle routine dependency updates.

## Git safety

- Never force push.
- Do not decide to force push independently under any circumstance.
- Before even asking the user about a force push, exhaust and explain safer alternatives such as a normal push, pull/rebase with conflict resolution, a new branch, a revert, or a follow-up commit.
- Only if every safer alternative has been considered and rejected may you ask the user for explicit force-push approval.

## Content and static generation

To add a content-backed page:

1. Create a `.adoc` file in `content/`.
2. Add the page slug to `navPages` in `lib/config.ts`.
3. The dynamic route prerenders it through `getStaticPaths` and `getStaticProps`.

`/about` is a dedicated page, but it also uses `getStaticProps`; `next build` should report it as SSG.

## Security notes

Security headers live in `next.config.ts`. When adding external resources, update the CSP deliberately. HTML generated from AsciiDoc must stay sanitized through the DOMPurify allowlist in `lib/content.ts`.

## Quality gates

Run these before handing off a visual or content change:

```bash
pnpm lint
pnpm test
pnpm build
pnpm test:e2e
```

`pnpm validate` remains useful for formatting, linting, and type-checking, but it does not replace the Playwright harness.

Common commands:

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Production build and static generation check
pnpm lint         # Run ESLint
pnpm lint:fix     # Auto-fix ESLint issues
pnpm format       # Format with Prettier
pnpm type-check   # TypeScript type checking
pnpm test         # Run unit tests with Vitest
pnpm test:e2e     # Run Playwright E2E tests
pnpm validate     # Format check, lint, and type-check
```

## Test layers

- **Component tests**: Vitest + Testing Library for interactive React behavior, especially navigation state, active links, and accessibility labels.
- **End-to-end tests**: Playwright for the real visitor flow across Chromium desktop and Mobile Chrome.
- **Accessibility checks**: `@axe-core/playwright` on user-facing pages after layout or navigation changes.
- **Build checks**: `next build` is the production contract for static generation, routing, and CSS compilation.

## Current critical scenarios

- `/` redirects to `/about`.
- Desktop navigation exposes all configured pages and marks the active page.
- Mobile burger opens, closes, traps no scroll on body, and keeps link labels stable.
- `/about` keeps the terminal visual contract: dark background, mono type, ASCII hero, stats, timeline cards, and no axe violations.
- The hero ASCII stays contained on mobile widths instead of forcing the page wider than the viewport.

## Manual visual QA checklist

- Open `/about` on desktop and mobile widths.
- Confirm the ASCII hero, grid/scanline atmosphere, stat cards, timeline cards, nav hover states, and terminal footer feel cohesive.
- On mobile, confirm no horizontal page overflow and the burger menu remains usable.
- Check reduced-motion settings when changing animations.

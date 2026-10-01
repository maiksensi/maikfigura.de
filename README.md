# maikfigura.de

Personal homepage of Maik Figura, built with Next.js (Pages Router), React, TypeScript, and Tailwind CSS 4.

## Setup

Node 24 and pnpm 11 are required.

```bash
pnpm install
pnpm dev
```

The dev server runs at <http://localhost:3000>. `/` redirects to `/about`.

## Commands

- `pnpm dev` - start the development server
- `pnpm build` - build for production and prerender every page
- `pnpm start` - serve the production build
- `pnpm validate` - check formatting (Biome), lint (ESLint), and types (tsc)
- `pnpm format` - format and sort imports with Biome
- `pnpm test` - run unit tests with Vitest
- `pnpm test:e2e` - run Playwright end-to-end and axe accessibility tests

## Adding content

1. Create a Markdown file in `content/`, for example `content/talks.md`. The first `# Heading` becomes the page title.
2. Add the slug (`talks`) to `navPages` in `lib/config.ts`.
3. The page is prerendered at `/{slug}`.

`about.md` and `work.md` feed the custom `/about` page and have no route of their own.

## Content processing

`lib/content.ts` converts Markdown to HTML with `marked` at build time and sanitizes it with DOMPurify against a tag allowlist.

## Further reading

- `docs/testing-strategy.md` - quality gates, test layers, and the visual contract
- `docs/dependency-management.md` - exact version pinning
- `docs/git-safety.md` - git rules, especially for force-push

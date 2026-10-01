# Repository Agent Instructions

## Project

Personal homepage of Maik Figura. A static Next.js site using the **Pages Router** (`pages/`), not the App Router. Content is Markdown in `content/`, converted with `marked` and sanitized with DOMPurify in `lib/content.ts` at build time. `/` redirects to `/about`. `content/about.md` and `content/work.md` only feed `/about` and have no route of their own.

## Rules

- Pin exact dependency versions, for example `"next": "16.3.6"`. Never add `^` or `~`.
- A change is done only when `pnpm validate`, `pnpm test`, `pnpm build`, and `pnpm test:e2e` all pass. CI runs the same checks.

## Commands

- Install: `pnpm install` (Node 24, pnpm 11)
- Dev server: `pnpm dev` at http://localhost:3000
- Format: `pnpm format`
- Check format, lint, and types: `pnpm validate`
- Unit tests: `pnpm test`
- Build: `pnpm build`
- E2E and axe accessibility tests: `pnpm test:e2e` (starts `pnpm dev` itself)

## Code style

Biome owns formatting: single quotes, no semicolons, 2-space indent, 100-character lines, sorted imports. Run `pnpm format` before you commit. ESLint owns linting.

## Commits

Use Conventional Commits, enforced by `commitlint.config.js`. Allowed types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `ci`. Keep the subject lowercase without a full stop, and keep body lines at 100 characters or fewer.

## Gotchas

- `docs/*` is gitignored. Only the three guides below and `docs/adr/` are tracked.
- Keep the DOMPurify allowlist in `lib/content.ts` and the CSP in `next.config.ts` as tight as they are. Widen them only for a specific, reviewed need.
- The visual design is a tested contract. Read `docs/adr/` before you change styles.

## Further guides

- `docs/testing-strategy.md` for testing conventions, quality gates, and manual QA sensors.
- `docs/dependency-management.md` for the exact-pin policy and how the pinning sensor enforces it.
- `docs/git-safety.md` for git operation safety, especially force-push rules.
- `docs/adr/` for architecture and design decisions.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

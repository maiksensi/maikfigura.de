# Testing Strategy

This site is a small static-first Next.js application, so the testing guide should stay fast and focused on the surfaces visitors actually use.

## Project contract

- **Framework**: Next.js 16 with React 19 and TypeScript.
- **Styling**: Tailwind CSS 4 with PostCSS.
- **Content**: Markdown files in `content/`, rendered with `marked` and sanitized with DOMPurify in `lib/content.ts`.
- **Runtime**: Node `24.x`, matching the Vercel production setting.
- **Package manager**: pnpm 11, pinned through `packageManager` and constrained by `engines.pnpm`.

## Code conventions

oxfmt enforces formatting and import order (`.oxfmtrc.json`):

- No semicolons.
- Single quotes.
- 2-space indentation.
- ES5 trailing commas.
- Max line width: 100 characters.
- oxfmt sorts imports (`sortImports`).

oxfmt owns formatting for `.ts/.tsx/.json` and skips Markdown, CSS, and YAML. oxlint (`.oxlintrc.json`) owns linting: it keeps the `typescript-eslint` recommended rules, enables the react, jsx-a11y, nextjs, and import plugins at the correctness level, and fails on warnings.

All handoffs should pass `pnpm validate` before merge. Use exact dependency versions and let Renovate handle routine dependency updates; see `docs/dependency-management.md` for the pin policy and its sensor.

## Content and static generation

To add a content-backed page:

1. Create a `.md` file in `content/`.
2. Add the page slug to `navPages` in `lib/config.ts`.
3. The dynamic route prerenders it through `getStaticPaths` and `getStaticProps`.

`/about` is a dedicated page, but it also uses `getStaticProps`; `next build` should report it as SSG.

## Security notes

Security headers live in `next.config.ts`. When adding external resources, update the CSP deliberately. `script-src` allows only `'self'`; dev adds `'unsafe-eval'` for React Refresh. Every script must therefore load from a file, so `experimental.turbopackSharedRuntime` stays off: since Next 16.4 it inlines the Turbopack bootstrap, which the CSP blocks and the site never hydrates. HTML generated from Markdown must stay sanitized through the DOMPurify allowlist in `lib/content.ts`.

## Quality gates

Run these before handing off a visual or content change:

```bash
pnpm validate     # oxfmt --check, oxlint, tsc --noEmit
pnpm test
pnpm build
pnpm test:e2e
```

`pnpm validate` covers formatting (`pnpm format:check`), linting, and type-checking in one step, and the CI harness runs it on every push and pull request. It does not replace the Playwright harness, so still run `pnpm test:e2e`. Formatting is not optional: `pnpm format:check` must report no issues before merge.

Common commands:

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Production build and static generation check
pnpm lint         # Run oxlint
pnpm lint:fix     # Auto-fix oxlint issues
pnpm format       # Format and sort imports with oxfmt
pnpm type-check   # TypeScript type checking
pnpm test         # Run unit tests with Vitest
pnpm test:e2e     # Run Playwright E2E tests
pnpm validate     # Format check, lint, and type-check
```

## Test layers

- **Component tests**: Vitest + Testing Library for interactive React behavior, especially navigation state, active links, and accessibility labels.
- **End-to-end tests**: Playwright for the real visitor flow across Chromium desktop and Mobile Chrome. The harness builds the site and runs `pnpm start` on port 3100, because bundling and the CSP differ between `pnpm dev` and production.
- **Accessibility checks**: `@axe-core/playwright` on user-facing pages after layout or navigation changes.
- **Build checks**: `next build` is the production contract for static generation, routing, and CSS compilation.

## Testing sensor

The testing sensor is the observable evidence that a change works through its user-facing surface:

- Relevant automated checks pass for the touched surface.
- `pnpm format:check` reports no formatting issues (also enforced by `pnpm validate` and CI).
- The matching page or flow has been exercised manually, not just read in source.
- Any skipped check is named with the reason and the residual risk.

## Current critical scenarios

- `/` redirects to `/about` on the server (`redirects()` in `next.config.ts`), so it works without JavaScript.
- Every page hydrates in the production build with no CSP violations (`e2e/csp.spec.ts`).
- Desktop navigation exposes all configured pages and marks the active page.
- Mobile burger opens, closes, locks body scroll while open, moves focus into the menu, returns focus on Escape, and keeps link labels stable.
- `/about` keeps the black and white noir comic contract (see `docs/adr/0005-noir-comic-design.md`): white background, black text, Comic Neue body, Bangers headline, comic panels, timeline cards, and no axe violations.
- The hero and stat panels stay contained on mobile widths instead of forcing the page wider than the viewport.
- Keyboard users can skip to the main content, and the closed mobile menu is `inert`, so its links are not in the tab order.

## Manual visual QA checklist

- Open `/about` on desktop and mobile widths.
- Confirm the noir splash hero, speech bubble, starbursts, inverted stat panels, timeline panels, and nav hover and focus states feel cohesive, with no color anywhere.
- Tab through the page and confirm the focus ring is visible on black and on white surfaces.
- On mobile, confirm no horizontal page overflow and the burger menu remains usable.
- Check reduced-motion settings when changing animations.

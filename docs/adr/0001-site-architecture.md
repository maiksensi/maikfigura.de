# ADR 0001: Site Architecture

## Status

Accepted

## Context

The homepage is a personal site with static content, a small set of routes, and a strong need for reliability on desktop and mobile. Content should remain easy to update without introducing a CMS or runtime backend.

## Decision

Use Next.js Pages Router with static generation for content pages. Store authored content as Markdown in `content/`, convert it with `marked` and sanitize it with DOMPurify in `lib/content.ts` at build time, and render the main entry experience through a dedicated `pages/about.tsx`. Keep `/` as a redirect to `/about`.

Shared shell behavior lives in React components such as `Navigation`, while visual tokens and page atmosphere live in `styles/globals.css` using Tailwind v4 theme variables.

## Consequences

- The public site remains fast, static-first, and simple to deploy.
- Content pages can be added through Markdown files and `siteConfig.navPages`.
- `about.md` and `work.md` only feed `/about` and get no route of their own.
- The custom `/about` page can evolve visually without disrupting the generic Markdown page renderer.
- Build and Playwright tests are the main safety net for route generation, responsive navigation, and CSS compilation.

## Guardrails

- Avoid heavy client dependencies for presentation-only effects.
- Keep navigation labels, ARIA attributes, and mobile menu behavior stable unless tests are updated with intent.
- Preserve the root redirect to `/about`.

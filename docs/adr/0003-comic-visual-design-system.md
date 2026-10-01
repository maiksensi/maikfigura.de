# ADR 0003: 80s Comic Visual Design System

## Status

Superseded by [ADR 0005](0005-noir-comic-design.md). Superseded [ADR 0002](0002-visual-design-system.md).

## Context

The dark terminal look from ADR 0002 no longer fits how the site owner wants to present himself. The new direction is a playful 80s comic book style that stays readable, accessible, and mobile-friendly.

## Decision

Adopt an 80s comic book design language across all pages:

- Bangers as the display face for titles, navigation, and sound effects; Comic Neue for body text. Both load through `next/font/google`, so they are self-hosted and need no CSP change.
- Tokens: newsprint background `#fdf3d7`, ink foreground `#111111`, red accent `#c8102e`, plus process colors yellow `#ffd60a`, cyan `#22d3ee`, magenta `#ff4fa3`, and blue `#1d4ed8`.
- Ben-Day halftone dots on the page, a blue sunburst hero, thick ink borders with hard offset shadows, yellow narration captions, a speech bubble, and decorative starburst badges (`aria-hidden`).
- CSS-only motion (title pop-in, burst wiggle, panel hover) with the existing `prefers-reduced-motion` guard.

## Consequences

- The site gets a distinct, memorable look without new runtime dependencies.
- The background and foreground tokens and the display font are part of the tested visual contract in `e2e/about.spec.ts`.
- The visible hero title is the page `h1`, so the accessible name and the visual headline match.

## Guardrails

- Keep text on process colors at WCAG AA contrast; use ink text on yellow, cyan, and magenta, and white text only on the red accent or ink.
- Keep rotations and skews small so text stays legible.
- Keep decorative sound effects `aria-hidden` and out of the content flow on narrow screens.
- Preserve mobile navigation usability and avoid horizontal overflow.

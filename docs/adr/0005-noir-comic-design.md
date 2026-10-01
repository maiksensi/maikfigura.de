# ADR 0005: Black and White Noir Comic Design

## Status

Accepted. Supersedes [ADR 0003](0003-comic-visual-design-system.md). The arcade alternative, [ADR 0004](0004-arcade-visual-design-system.md), was rejected.

## Context

The site owner preferred the comic version over the arcade version and asked for a more black and white look. Of the offered styles (noir, manga screentone, ink sketch, newspaper strip), he chose noir, pure monochrome with no accent color, plus the accessibility fixes from the arcade version.

## Decision

- Keep the comic structure from ADR 0003: Bangers display type, Comic Neue body type, panels with hard offset shadows, speech bubble, starbursts, tilted stat and timeline panels.
- Use only black `#000000`, white `#ffffff`, and gray `#6b6b6b` (offset shadows) on a white page with a faint gray halftone.
- The hero is a black splash panel with slanted rain streaks and a light falloff, and a white title with a gray block shadow.
- Emphasis comes from inversion: black navigation with a white tag for the current page, alternating black and white stat panels, black year tags, and links that invert on hover.
- Starbursts are white with a black outline.

Accessibility measures carried over from the arcade version:

- A "Skip to content" link targets `main#main`.
- The mobile menu is a labelled `nav` disclosure with `aria-expanded` and `aria-controls`, `inert` while closed. Opening it moves focus to the first link; Escape closes it and returns focus to the button.
- A two-tone focus ring (white outline, black halo) that is visible on black and on white surfaces.
- Animations are finite and removed under `prefers-reduced-motion`.
- Highlights render as a labelled list; starbursts are `aria-hidden`.
- Axe checks run for every page and for the open mobile menu.

## Consequences

- Black on white gives a contrast ratio of 21:1, so contrast is no longer a design constraint.
- The tested visual contract in `e2e/about.spec.ts` is a white `main` background, black text, Comic Neue body type, and a Bangers headline.

## Guardrails

- Do not add color. Hierarchy comes from inversion, weight, and scale.
- Use gray only for shadows and texture, never for text.

# ADR 0004: 80s Arcade Visual Design System

## Status

Rejected. The site owner compared it with the comic version and chose the comic direction ([ADR 0005](0005-noir-comic-design.md)). Kept because its accessibility measures were carried over into ADR 0005.

## Context

The site owner wants to compare the 80s comic look with an 80s arcade game look. The arcade version must also meet WCAG 2.2 AA, so accessibility is part of the decision, not an afterthought.

## Decision

Adopt an 80s arcade design language across all pages:

- Press Start 2P for headings, navigation, and HUD text; IBM Plex Mono for body text, because a pixel font is hard to read in long paragraphs. Both load through `next/font/google`, so they are self-hosted and need no CSP change.
- Tokens: background `#0b0b1e`, foreground `#e8e8f0`, panel `#15153a`, accent yellow `#ffe600`, plus neon cyan `#00e5ff`, magenta `#ff4fd8`, red `#ff5c5c`, green `#39ff14`, and maze blue `#4d6bff`.
- A CRT screen hero with a decorative HUD (`aria-hidden`), a box-shadow pixel invader, a dialog box tagline, score cards, and a "Stage select" timeline with `LVL` year tags.
- Faint scanlines and a star field as background layers that never sit on top of text contrast.

Accessibility measures:

- Every text color meets 4.5:1 against the background and panel color. Maze blue (4.5:1 on the background, 4.05:1 on panels) is used only for borders.
- A "Skip to content" link targets `main#main`.
- The mobile menu is a labelled `nav` disclosure with `aria-expanded` and `aria-controls`, not a modal dialog. It is `inert` while closed, so its links leave the tab order and the accessibility tree. Opening it moves focus to the first link; Escape closes it and returns focus to the button.
- A visible yellow `:focus-visible` outline on every focusable element.
- Blinking and sprite animations stop after a few cycles (WCAG 2.2.2), stay below three flashes per second (WCAG 2.3.1), and are removed under `prefers-reduced-motion`.
- Highlights render as a labelled list; decorative text such as the HUD and "Press start" is hidden from assistive technology.

## Consequences

- The background and foreground tokens and the pixel heading font are part of the tested visual contract in `e2e/about.spec.ts`.
- Unit and e2e tests cover the skip link, the inert closed menu, and focus handling.

## Guardrails

- Do not use maze blue or other sub-4.5:1 colors for text.
- Keep pixel fonts out of body copy.
- Keep every animation finite and covered by the reduced-motion guard.

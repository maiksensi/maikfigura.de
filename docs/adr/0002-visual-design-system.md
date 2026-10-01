# ADR 0002: Visual Design System

## Status

Superseded by [ADR 0003](0003-comic-visual-design-system.md).

## Context

The refreshed homepage should feel closer to software-factory.dev, factory.ai, and openhands.dev while staying personal, readable, and mobile-friendly.

## Decision

Adopt a dark terminal-inspired design language for `/about`:

- JetBrains Mono as the dominant typeface.
- Background token `#0f111a`, foreground token `#d4d4d4`, and green accent token `#22c55e`.
- ASCII hero, terminal prompts, card borders, grid/scanline atmosphere, and small hover micro-interactions.
- CSS-only motion with a `prefers-reduced-motion` guard.
- Mobile ASCII containment via responsive sizing and overflow containment so the hero does not widen the page.

## Consequences

- The homepage has a memorable terminal/agentic aesthetic without animation libraries or large dependencies.
- The exact background and foreground tokens are part of the tested visual contract.
- ASCII art remains decorative (`aria-hidden`) while semantic headings and content carry the accessible page meaning.

## Guardrails

- Do not add visual effects that change the computed main background or foreground colors expected by tests.
- Keep hover and reveal animations subtle, CSS-only, and reducible.
- Preserve mobile navigation usability before adding decorative motion.

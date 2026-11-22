# ADR 0006: oxc Toolchain for Linting and Formatting

## Status

Accepted.

## Context

Biome only formatted the code and sorted imports; its linter was off. ESLint with `typescript-eslint` did the linting. Next.js 16 removed `next lint`, so no React, accessibility, or Next.js rules ran at all. Two tools with two configs and two update streams covered less than one tool could.

## Decision

- Lint with oxlint 1.94.0, configured in `.oxlintrc.json`. The config comes from the official `@oxlint/migrate` run on the ESLint config, so it keeps the `typescript-eslint` recommended rules. It adds the react, jsx-a11y, nextjs, and import plugins (beside eslint, typescript, unicorn, and oxc) at the correctness level. `pnpm lint` fails on warnings.
- Format with oxfmt 0.79.0, configured in `.oxfmtrc.json`. The config comes from `oxfmt --migrate=biome` and keeps the same style: single quotes, no semicolons, 2-space indent, 100-character lines, ES5 trailing commas, sorted imports. Markdown, CSS, YAML, and `public/` stay unformatted, and `package.json` keys are not sorted.
- Pin both tools exactly. Renovate updates them together in the `oxc` group.
- Keep the script names `format`, `format:check`, `lint`, `lint:fix`, and `validate`, so CI and habits do not change.

## Consequences

- The switch changed formatting in one place: oxfmt puts Node builtins before packages, so two imports in `lib/content.ts` moved.
- The jsx-a11y plugin found 4 errors on two click handlers in the mobile menu overlay. The handlers never ran, because the list fills the overlay and stopped every click. Removing them fixed the findings without a change in behavior; an e2e test pins that tapping empty overlay space keeps the menu open.
- oxfmt is still 0.x, so a minor update can change its output. Such an update then fails `pnpm format:check` in CI, which also stops Renovate from merging it automatically, until someone runs `pnpm format`.
- The existing `eslint-disable-next-line` comments stay, because oxlint reads them.

## Guardrails

- Do not enable type-aware linting or categories beyond correctness without a new ADR.
- Fix lint findings at their cause. Do not disable a rule or add an `oxlint-disable` comment to silence one.

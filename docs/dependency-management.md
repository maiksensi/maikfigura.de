# Dependency Management

This project pins every dependency to an exact version. No `^`, no `~`, no ranges.

## Why exact pins

- **Reproducible builds.** The version that passed CI is the version that ships. `pnpm-lock.yaml` already locks the tree, but an exact `package.json` keeps intent and lockfile aligned and makes review honest.
- **No silent majors.** A range like `^4.0.0` lets a bump slip in without review. That is exactly how `asciidoctor` 4.x once entered the build and broke Vercel prerendering. Every version change should be a deliberate, reviewed diff.
- **Renovate stays useful.** Pins do not block updates. Renovate opens a PR for each new version as an explicit change you can read, test, and merge or reject.

## How it is enforced

Two layers:

1. **Prevention — `.npmrc`.** `save-exact=true` makes `pnpm add <pkg>` write an exact version instead of a `^` range. You do not have to remember to strip the prefix.
2. **Detection — the pinning sensor.** `test/dependency-pinning.test.ts` reads `package.json` and fails if any entry in `dependencies`, `devDependencies`, `optionalDependencies`, or `peerDependencies` is not an exact `MAJOR.MINOR.PATCH` version. It runs with `pnpm test`.

The CI harness (`.github/workflows/on-push-and-pr.yml`) runs `pnpm validate` and `pnpm test` on every push and pull request, so a stray range prefix or a formatting slip fails the build before merge.

## Adding a dependency

```bash
corepack pnpm add <package>          # writes an exact version thanks to .npmrc
corepack pnpm add -D <package>       # dev dependency
```

Then confirm the version has no prefix:

```bash
corepack pnpm test                   # the pinning sensor runs here
```

If you ever hand-edit `package.json`, keep the version exact (e.g. `18.0.5`, not `^18.0.5`). The sensor will catch a stray prefix before it reaches CI.

## Updating a dependency

Let Renovate propose the bump, or bump deliberately:

```bash
corepack pnpm add <package>@<exact-version>
```

Review the changelog for majors, run the quality gates (`pnpm lint`, `pnpm test`, `pnpm build`, `pnpm test:e2e`), then merge.

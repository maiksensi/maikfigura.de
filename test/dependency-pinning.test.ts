import { readFileSync } from 'fs'
import path from 'path'
import { describe, expect, it } from 'vitest'

// Sensor: every dependency must be pinned to an exact version.
//
// Range prefixes (^, ~), wildcards (x, *), ranges, and git/url specifiers let
// unreviewed upstream changes into the build. A Renovate range once pulled in a
// broken major (asciidoctor 4.x) and failed the Vercel build. Exact pins make
// every version change an explicit, reviewable diff.

const DEPENDENCY_FIELDS = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
  'peerDependencies',
] as const

// Exact semver: MAJOR.MINOR.PATCH with optional -prerelease and +build metadata.
const EXACT_SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/

const packageJsonPath = path.resolve(__dirname, '..', 'package.json')
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8')) as Record<
  string,
  Record<string, string> | undefined
>

function collectEntries(): Array<[string, string, string]> {
  const entries: Array<[string, string, string]> = []
  for (const field of DEPENDENCY_FIELDS) {
    const block = packageJson[field]
    if (!block) continue
    for (const [name, version] of Object.entries(block)) {
      entries.push([field, name, version])
    }
  }
  return entries
}

describe('dependency pinning sensor', () => {
  const entries = collectEntries()

  it('declares at least one dependency to guard', () => {
    expect(entries.length).toBeGreaterThan(0)
  })

  it.each(entries)('%s: "%s" is pinned to an exact version (%s)', (_field, _name, version) => {
    expect(version).toMatch(EXACT_SEMVER)
  })
})

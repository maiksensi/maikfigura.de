import { expect, test } from '@playwright/test'

declare global {
  interface Window {
    cspViolations: string[]
    next?: unknown
  }
}

test.describe('Content Security Policy', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.cspViolations = []
      document.addEventListener('securitypolicyviolation', (event) => {
        window.cspViolations.push(`${event.violatedDirective} blocked ${event.blockedURI}`)
      })
    })
  })

  for (const path of ['/about', '/appearances', '/contact', '/privacy', '/does-not-exist']) {
    test(`${path} hydrates without CSP violations`, async ({ page }) => {
      await page.goto(path)
      expect(await page.evaluate(() => window.cspViolations)).toEqual([])
      // Next sets window.next once the client runtime boots; a blocked script never gets there.
      await page.waitForFunction(() => window.next !== undefined)
    })
  }
})

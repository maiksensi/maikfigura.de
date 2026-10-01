import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('should render dark theme and terminal aesthetic', async ({ page }) => {
    const main = page.locator('main')

    await expect(main).toHaveCSS('font-family', /JetBrains Mono|Geist Mono|ui-monospace|monospace/)
    await expect(main).toHaveCSS('background-color', 'rgb(15, 17, 26)')
    await expect(main).toHaveCSS('color', 'rgb(212, 212, 212)')

    const pre = page.locator('pre[aria-hidden="true"]')
    await expect(pre).toBeVisible()
    await expect(pre).toContainText('__')

    const timeline = page.locator('.timeline-cards')
    await expect(timeline).toBeVisible()
    await expect(timeline.locator('p').first()).toBeVisible()
  })

  test('skip link moves keyboard focus to the main content', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.keyboard.press('Tab')
    const skipLink = page.getByRole('link', { name: /skip to content/i })
    await expect(skipLink).toBeFocused()
    await expect(skipLink).toBeInViewport()

    await page.keyboard.press('Enter')
    await expect(page.locator('main')).toBeFocused()
  })

  test('should pass a11y', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })
})

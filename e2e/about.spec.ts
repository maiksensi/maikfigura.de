import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about')
  })

  test('should render the black and white noir comic aesthetic', async ({ page }) => {
    const main = page.locator('main')

    await expect(main).toHaveCSS('font-family', /Comic Neue|Comic Sans MS/)
    await expect(main).toHaveCSS('background-color', 'rgb(255, 255, 255)')
    await expect(main).toHaveCSS('color', 'rgb(0, 0, 0)')

    const title = page.getByRole('heading', { level: 1, name: /Maik Figura/i })
    await expect(title).toBeVisible()
    await expect(title).toHaveCSS('font-family', /Bangers/)

    const timeline = page.locator('.timeline-cards')
    await expect(timeline).toBeVisible()
    await expect(timeline.locator('p').first()).toBeVisible()
  })

  test('should not overflow the viewport horizontally', async ({ page }) => {
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    expect(overflow).toBeLessThanOrEqual(0)
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

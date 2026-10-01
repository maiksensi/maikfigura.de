import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('Navigation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('homepage redirects to about and content loads', async ({ page }) => {
    // Homepage should redirect to about page
    await expect(page).toHaveURL(/.*\/about\/?$/)

    // Main content should be visible
    await expect(page.getByText(/Hi! My name is Maik/i)).toBeVisible()

    // Check basic accessibility
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const accessibilityResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityResults.violations).toEqual([])
  })

  test('desktop navigation works', async ({ page }) => {
    // Skip on mobile devices
    await page.setViewportSize({ width: 1024, height: 768 })

    // Navigate to contact page via desktop nav
    await page
      .getByLabel('Main navigation')
      .getByRole('link', { name: /contact/i })
      .click()
    await expect(page).toHaveURL(/.*\/contact\/?$/)
    await expect(page.getByRole('heading', { name: /contact/i })).toBeVisible()
  })

  test('mobile navigation works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Open mobile navigation
    const burgerButton = page.locator('nav button[aria-label*="Open navigation"]')
    await expect(burgerButton).toBeVisible()
    await burgerButton.click()

    // Check overlay is visible
    const overlay = page.getByRole('navigation', { name: 'Mobile navigation menu' })
    await expect(overlay).toBeVisible()
    await expect(overlay.getByRole('link').first()).toBeFocused()

    // Navigate to privacy page via mobile nav
    await page
      .getByLabel('Mobile navigation menu')
      .getByRole('link', { name: /privacy/i })
      .click()
    await expect(page).toHaveURL(/.*\/privacy\/?$/)
    await expect(page.getByRole('heading', { name: /privacy/i, level: 1 })).toBeVisible()

    // Navigation should be closed after navigation
    await expect(burgerButton).toBeVisible()
  })

  test('mobile burger menu transforms correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Open navigation
    const burgerButton = page.locator('nav button[aria-label*="Open navigation"]')
    await burgerButton.click()

    // Button should change to close state
    await expect(page.locator('nav button[aria-label="Close navigation"]')).toBeVisible()

    // Close navigation
    await page.locator('nav button[aria-label="Close navigation"]').click()

    // Should return to burger state
    await expect(page.locator('nav button[aria-label*="Open navigation"]')).toBeVisible()
  })

  test('closed mobile menu links are not keyboard reachable', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab')
      const insideMenu = await page.evaluate(
        () => document.activeElement?.closest('#mobile-menu') !== null
      )
      expect(insideMenu).toBe(false)
    }
  })

  for (const path of ['/appearances', '/contact', '/privacy', '/does-not-exist']) {
    test(`${path} passes a11y`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      const results = await new AxeBuilder({ page }).analyze()
      expect(results.violations).toEqual([])
    })
  }

  test('open mobile menu passes a11y', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await page.locator('nav button[aria-label*="Open navigation"]').click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation menu' })).toBeVisible()
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
})

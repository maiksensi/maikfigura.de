import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

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
    const accessibilityResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityResults.violations).toEqual([])
  })

  test('desktop navigation works', async ({ page }) => {
    // Skip on mobile devices
    await page.setViewportSize({ width: 1024, height: 768 })
    
    // Navigate to contact page via desktop nav
    await page.getByRole('list').getByRole('link', { name: /contact/i }).click()
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
    const overlay = page.locator('[role="dialog"][aria-modal="true"]')
    await expect(overlay).toBeVisible()
    
    // Navigate to work page via mobile nav
    await page.getByLabel('Mobile navigation menu').getByRole('link', { name: /work/i }).click()
    await expect(page).toHaveURL(/.*\/work\/?$/)
    await expect(page.getByRole('heading', { name: /work/i })).toBeVisible()
    
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
})

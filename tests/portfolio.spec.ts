import { test, expect } from '@playwright/test';

test.describe('Portfolio Core Functionality', () => {
  test('should load the homepage and display the hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check if the title/name is visible
    await expect(page.locator('h1', { hasText: 'YOHANES' })).toBeVisible();
  });

  test('should navigate through iPod projects', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the work section to be visible
    const workSection = page.locator('#work');
    await workSection.scrollIntoViewIfNeeded();

    // The Next button on the iPod controls
    const nextBtn = page.locator('button[aria-label="Next Project"]');
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      // Add a small wait for the GSAP animation
      await page.waitForTimeout(500);
      await expect(page.locator('text=SERENITY').first()).toBeVisible();
    }
  });
});

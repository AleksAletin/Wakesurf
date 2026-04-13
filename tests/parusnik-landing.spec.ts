import { test, expect } from '@playwright/test';

test.describe('Parusnik Landing Page', () => {
  test('renders hero', async ({ page }) => {
    await page.goto('/parusnik');
    await expect(page.locator('h1')).toContainText('на природе');
    await expect(page.locator('header >> text=Парусник')).toBeVisible();
  });

  test('has services section', async ({ page }) => {
    await page.goto('/parusnik');
    await expect(page.locator('#services')).toBeAttached();
    await expect(page.locator('#services h2')).toContainText('Услуги клуба');
  });

  test('has 10 gazebo links', async ({ page }) => {
    await page.goto('/parusnik');
    const gazeboLinks = page.locator('#gazebos a[href*="/booking?gazebo="]');
    await expect(gazeboLinks).toHaveCount(10);
  });

  test('about section in DOM', async ({ page }) => {
    await page.goto('/parusnik');
    await expect(page.locator('#about')).toBeAttached();
  });

  test('footer has Parusnik phone', async ({ page }) => {
    await page.goto('/parusnik');
    const phone = page.locator('footer >> text=+7 (915) 488-81-21');
    await expect(phone).toBeAttached();
  });
});

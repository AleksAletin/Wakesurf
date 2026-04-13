import { test, expect } from '@playwright/test';

test.describe('PandaWake Landing Page', () => {
  test('renders hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('свою волну');
    await expect(page.locator('header >> text=PandaWake')).toBeVisible();
  });

  test('has services section in DOM', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#services')).toBeAttached();
    await expect(page.locator('#services h2')).toContainText('На воде и на берегу');
  });

  test('has gazebos section in DOM', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#gazebos')).toBeAttached();
  });

  test('booking link exists', async ({ page }) => {
    await page.goto('/');
    const bookingLink = page.locator('a[href="/booking"]').first();
    await expect(bookingLink).toBeAttached();
  });

  test('cross-promo in DOM', async ({ page }) => {
    await page.goto('/');
    const promo = page.locator('text=Нужна беседка или рыбалка');
    await expect(promo).toBeAttached();
  });
});

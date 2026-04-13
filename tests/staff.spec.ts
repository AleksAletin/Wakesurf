import { test, expect } from '@playwright/test';

test.describe('Staff PWA', () => {
  test('renders dashboard', async ({ page }) => {
    await page.goto('/staff');
    await expect(page.locator('text=PandaWake').first()).toBeVisible();
    await expect(page.locator('text=БРОНЕЙ')).toBeVisible();
    await expect(page.locator('text=ВЫРУЧКА')).toBeVisible();
  });

  test('shows schedule', async ({ page }) => {
    await page.goto('/staff');
    await expect(page.locator('text=РАСПИСАНИЕ НА СЕГОДНЯ')).toBeAttached();
  });

  test('FAB navigates to new booking', async ({ page }) => {
    await page.goto('/staff');
    const fab = page.locator('a[href="/staff/new"]');
    await expect(fab).toBeVisible();
    await fab.click();
    await expect(page).toHaveURL('/staff/new');
  });

  test('new booking form works', async ({ page }) => {
    await page.goto('/staff/new');
    await expect(page.locator('text=Новая запись')).toBeVisible();
    await expect(page.locator('select')).toBeVisible();
  });

  test('PWA manifest served', async ({ page }) => {
    const res = await page.goto('/staff/manifest.json');
    expect(res?.status()).toBe(200);
    const json = await res?.json();
    expect(json.name).toBe('PandaWake Staff');
    expect(json.display).toBe('standalone');
  });
});

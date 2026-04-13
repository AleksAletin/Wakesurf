import { test, expect } from '@playwright/test';

test.describe('Admin Dashboard', () => {
  test('renders with stats', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('h1:has-text("Дашборд")')).toBeVisible();
    await expect(page.locator('text=Броней сегодня')).toBeVisible();
    await expect(page.locator('text=Новая запись')).toBeVisible();
  });

  test('sidebar nav works', async ({ page }) => {
    await page.goto('/admin');
    await page.locator('a:has-text("Брони")').first().click();
    await expect(page.locator('h1:has-text("Брони")')).toBeVisible();
  });
});

test.describe('Admin Bookings', () => {
  test('renders list with source badges', async ({ page }) => {
    await page.goto('/admin/bookings');
    await expect(page.locator('h1:has-text("Брони")')).toBeVisible();
    await expect(page.locator('.text-\\[10px\\]').first()).toBeAttached();
  });

  test('search works', async ({ page }) => {
    await page.goto('/admin/bookings');
    await page.fill('input[placeholder*="Поиск"]', 'Петров');
    await expect(page.locator('text=Алексей Петров')).toBeVisible();
  });

  test('status filter works', async ({ page }) => {
    await page.goto('/admin/bookings');
    await page.locator('button:has-text("Ожидают")').click();
    const cards = page.locator('text=Ожидает');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('has new booking button', async ({ page }) => {
    await page.goto('/admin/bookings');
    await expect(page.locator('a:has-text("Записать")')).toBeVisible();
  });
});

test.describe('Admin New Booking', () => {
  test('form renders', async ({ page }) => {
    await page.goto('/admin/new');
    await expect(page.locator('h1:has-text("Новая запись")')).toBeVisible();
    await expect(page.locator('select')).toBeVisible();
    await expect(page.locator('input[placeholder="Имя *"]')).toBeVisible();
  });

  test('can create booking', async ({ page }) => {
    await page.goto('/admin/new');
    await page.selectOption('select', 'wake-25');
    await page.locator('button:has-text("Tige 24v")').click();
    await page.fill('input[placeholder="Имя *"]', 'Новый Клиент');
    await page.fill('input[placeholder="Телефон *"]', '+7 999 000 11 22');
    await page.locator('text=Записать клиента').click();
    await expect(page.locator('text=Записано!')).toBeVisible();
  });

  test('boat selection appears for wake', async ({ page }) => {
    await page.goto('/admin/new');
    await page.selectOption('select', 'wake-25');
    await expect(page.locator('text=Tige 24v')).toBeVisible();
    await expect(page.locator('text=Centurion')).toBeVisible();
  });

  test('boat selection hidden for gazebo', async ({ page }) => {
    await page.goto('/admin/new');
    await page.selectOption('select', 'gazebo-1');
    await expect(page.locator('button:has-text("Tige 24v")')).not.toBeVisible();
  });
});

test.describe('Admin Schedule', () => {
  test('renders', async ({ page }) => {
    await page.goto('/admin/schedule');
    await expect(page.locator('h1:has-text("Расписание")')).toBeVisible();
  });
});

test.describe('Admin Clients', () => {
  test('renders', async ({ page }) => {
    await page.goto('/admin/clients');
    await expect(page.locator('h1:has-text("Клиенты")')).toBeVisible();
    await expect(page.locator('text=клиентов')).toBeVisible();
  });
});

test.describe('Admin Finances', () => {
  test('renders', async ({ page }) => {
    await page.goto('/admin/finances');
    await expect(page.locator('h1:has-text("Финансы")')).toBeVisible();
    await expect(page.locator('text=Общая выручка')).toBeVisible();
  });
});

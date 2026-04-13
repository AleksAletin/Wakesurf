import { test, expect } from '@playwright/test';

test.describe('Booking Flow - Wake', () => {
  test('full wake booking flow', async ({ page }) => {
    await page.goto('/booking');
    await expect(page.locator('text=Что хотите забронировать')).toBeVisible();

    // Step 0: pick wakesurf
    await page.locator('text=Вейксёрф / Вейкборд').click();

    // Step 1: pick 25 min
    await expect(page.locator('text=Выберите вариант')).toBeVisible();
    await page.locator('text=Вейксёрф / Вейкборд 25 мин').click();

    // Step 2: pick date
    await expect(page.locator('text=Выберите дату')).toBeVisible();
    const futureDate = page.locator('button:not([disabled])').filter({ hasText: /^2[0-8]$/ }).first();
    await futureDate.click();

    // Step 3: boat + time
    await expect(page.locator('text=Выберите катер')).toBeVisible();
    await page.locator('button:has-text("Tige 24v")').click();
    await page.locator('button:has-text("10:00")').first().click();

    // Step 4: details
    await expect(page.locator('text=Детали бронирования')).toBeVisible();
    await page.fill('input[placeholder="Алексей"]', 'Тест Тестов');
    await page.fill('input[placeholder*="900"]', '+7 999 123 45 67');
    await page.locator('text=Подтвердить бронирование').click();

    // Step 5: confirm
    await expect(page.locator('text=Заявка отправлена')).toBeVisible();
  });

  test('back navigation works', async ({ page }) => {
    await page.goto('/booking');
    await page.locator('text=Вейксёрф / Вейкборд').click();
    await expect(page.locator('text=Выберите вариант')).toBeVisible();
    await page.locator('text=Назад').click();
    await expect(page.locator('text=Что хотите забронировать')).toBeVisible();
  });

  test('reset works', async ({ page }) => {
    await page.goto('/booking');
    await page.locator('text=Вейксёрф / Вейкборд').click();
    await page.locator('text=Вейксёрф / Вейкборд 25 мин').click();
    await page.locator('text=Начать заново').click();
    await expect(page.locator('text=Что хотите забронировать')).toBeVisible();
  });
});

test.describe('Booking Flow - Gazebo', () => {
  test('gazebo shows all-day time', async ({ page }) => {
    await page.goto('/booking');
    await page.locator('text=Беседка').click();
    await page.locator('text=Беседка №1').first().click();
    const futureDate = page.locator('button:not([disabled])').filter({ hasText: /^2[0-8]$/ }).first();
    await futureDate.click();
    await expect(page.locator('text=10:00 — 22:00 (весь день)')).toBeVisible();
    await expect(page.locator('text=Выберите катер')).not.toBeVisible();
  });

  test('direct gazebo link pre-selects', async ({ page }) => {
    await page.goto('/booking?gazebo=gazebo-3');
    await expect(page.locator('text=Выберите дату')).toBeVisible();
  });
});

test.describe('Parusnik Booking', () => {
  test('parusnik booking works', async ({ page }) => {
    await page.goto('/parusnik/booking');
    await expect(page.locator('text=Бронирование')).toBeVisible();
    await expect(page.locator('header >> text=Парусник')).toBeVisible();
  });
});

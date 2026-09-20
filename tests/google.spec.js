import { test, expect } from '@playwright/test';

// Добавляем .skip, чбобы Playwright пропускал шаг 
test.skip ('Поиск в Google через Playwright', async ({ page }) => {
  await page.goto('https://google.com');
  await page.locator('textarea[name="q"]').fill('QA.GURU Playwright');
  await page.keyboard.press('Enter');
  await expect(page).toHaveTitle(/QA.GURU/);
});

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Генерация уникального email, чтобы тест не падал при повторных запусках
  const uniqueEmail = `user_${Date.now()}@test.ru`;

  // 1. Открываем главную страницу и переходим на форму регистрации
  await page.goto('https://qa.guru');
  await page.getByRole('link', { name: 'Sign up' }).click();

  // 2. Заполняем поля формы строго по одному разу
  await page.getByRole('textbox', { name: 'Your Name' }).fill('qwert567');
  await page.getByRole('textbox', { name: 'Email' }).fill(uniqueEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill('fffffffff7777');

  // 3. Нажимаем кнопку регистрации один раз
  await page.getByRole('button', { name: 'Sign up' }).click();

  // 4. Ждем, пока завершатся сетевые запросы после клика
  await page.waitForLoadState('networkidle');

  // 5. Проверяем успешную авторизацию по имени пользователя в навигации
  const userNameLink = page.locator('.navbar-nav').getByText('qwert567');
  await expect(userNameLink).toBeVisible({ timeout: 10000 });
});

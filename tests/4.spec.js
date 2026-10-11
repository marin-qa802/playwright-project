import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Генерация уникального email, чтобы тест не падал при повторных запусках
  const uniqueEmail = `user_${Date.now()}@test.ru`;

  // 1. Открываем главную страницу и переходим на форму регистрации
  await page.goto('https://realworld.qa.guru');
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

import { test, expect } from '@playwright/test';

// 1. Функция для генерации уникального email
function generateUniqueEmail() {
  return `user_${Date.now()}@test.ru`;
}

// 2. Функция для выполнения шагов регистрации
async function registerUser(page, name, email, password) {
  // Открываем главную страницу и переходим на форму регистрации
  await page.goto('https://realworld.qa.guru');
  await page.getByRole('link', { name: 'Sign up' }).click();

  // Заполняем поля формы
  await page.getByRole('textbox', { name: 'Your Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  // Нажимаем кнопку регистрации
  await page.getByRole('button', { name: 'Sign up' }).click();

  // Ждем, пока завершатся сетевые запросы
  await page.waitForLoadState('networkidle');
}

// 3. Функция для проверки успешной авторизации
async function verifyUserIsLoggedIn(page, userName) {
  const userNameLink = page.locator('.navbar-nav').getByText(userName);
  await expect(userNameLink).toBeVisible({ timeout: 10000 });
}

// --- Сам тест ---
test('test', async ({ page }) => {
  // Генерируем данные
  const uniqueEmail = generateUniqueEmail();
  const userName = 'qwert567';
  const userPassword = 'ffffffffff7777';

  // Вызываем функцию регистрации
  await registerUser(page, userName, uniqueEmail, userPassword);

  // Вызываем функцию проверки
  await verifyUserIsLoggedIn(page, userName);
});


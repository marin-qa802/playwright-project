import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('test', async ({ page }) => {
  // 1. Переход на сайт
  await page.goto('https://realworld.qa.guru/');

  // 2. Переход на страницу регистрации (вместо кликов по GitHub и iframe)
  await page.getByRole('link', { name: 'Sign up' }).click();

  // Ждем, пока прогрузится страница регистрации (обходим проверку DataDome ожиданием)
  await page.waitForLoadState('networkidle');

  // Генерируем случайные данные с помощью faker
  const randomName = faker.person.firstName();
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password();

  // 3. Заполнение формы регистрации
  await page.getByRole('textbox', { name: 'Your Name' }).fill(randomName);
  await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail);
  await page.getByRole('textbox', { name: 'Password' }).fill(randomPassword);
  
  // Нажимаем кнопку регистрации
  await page.getByRole('button', { name: 'Sign up' }).click();

  // 4. Проверка успешной регистрации (ожидаем, что появится имя пользователя)
  // Если DataDome все равно блокирует, можно добавить паузу перед проверкой:
  // await page.waitForTimeout(3000);
  await expect(page.getByText(randomName)).toBeVisible();
});


// https://realworld.qa.guru/#/
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const getEmail = () => faker.internet.email();
const getPassword = (length) => faker.internet.password({ length });

test('test', async ({ page }) => {
  // arrange - предпосылка - given
  await page.goto('https://realworld.qa.guru/');

  // ... начало теста
  const email = getEmail(); // Генерируем email

  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(email);
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(getPassword(10)); // Генерируем пароль
  await page.getByRole('button', { name: 'Sign up' }).click();

  // Ждем, пока навигация обновится (можно добавить явное ожидание, если нужно)
  await page.waitForTimeout(1000); // Не самый лучший способ, но для отладки подойдет

  // Проверяем, что в навигации есть наш СГЕНЕРИРОВАННЫЙ email
  await expect(page.getByRole('navigation')).toContainText(email);

}); // <--- Обязательно проверьте наличие этой скобки!
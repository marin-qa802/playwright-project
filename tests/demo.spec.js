import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  // Генерируем случайный email для каждого нового запуска теста
  const randomEmail = `maria_${Date.now()}@ya.ru`;

  await page.goto('https://realworld.qa.guru/');
  
  await page.getByRole('link', { name: 'Sign up' }).click();
  
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('Мария');
  
  await page.getByRole('textbox', { name: 'Email' }).click();
  // Передаем созданную переменную со случайным email
  await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail);
  
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('12345678');
  
  await page.getByRole('button', { name: 'Sign up' }).click();

  // Проверяем, что в шапке сайта появилось именно имя "Мария"
  await expect(page.getByRole('navigation')).toContainText('Мария');
});

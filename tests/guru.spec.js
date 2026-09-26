import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Подключаем генератор данных

test('test', async ({ page }) => {
  // Эти строки создают новые случайные данные ПРИ КАЖДОМ запуске теста:
  const randomName = faker.person.fullName(); 
  const randomEmail = faker.internet.email();

  await page.goto('https://realworld.qa.guru');
  await page.getByRole('link', { name: 'Sign up' }).click();
  
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(randomName); // Новое имя
  
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail); // Новая почта
  
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('876543qw');
  await page.getByRole('button', { name: 'Sign up' }).click();
  
  // Проверяем аватар именно с тем именем, которое сгенерировал Faker:
  await expect(page.getByRole('img', { name: randomName })).toBeVisible();
});

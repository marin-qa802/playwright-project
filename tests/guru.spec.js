import { test, expect } from '@playwright/test';
// Импортуем русскую версию Faker
import { fakerRU as faker } from '@faker-js/faker'; 

test('test', async ({ page }) => {
  // Генерируем полностью случайные имя, email и пароль
  const randomName = faker.person.fullName(); 
  const randomEmail = faker.internet.email();
  const randomPassword = faker.internet.password({ length: 10 });

 await page.goto('https://realworld.qa.guru/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(randomName); 
  
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(randomEmail); 
  
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(randomPassword); 
  
  await page.getByRole('button', { name: 'Sign up' }).click();
  
  // Проверяем аватар по сгенерированному русскому имени
  await expect(page.getByRole('img', { name: randomName })).toBeVisible();
});

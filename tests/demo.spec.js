import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    // arrange - предусловие - given
  await page.goto('https://realworld.qa.guru/');

  // act - шаги - when
  await page.getByRole('link', { name: 'Sign up' }).click();
  //await expect(page.getByRole('textbox', { name: 'Your Name' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill('sni14092026@ya.ru');

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('sni14092026@ya.ru');

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('sni14092026@ya.ru');

  await page.getByRole('button', { name: 'Sign up' }).click();

// assert - сравниваем фактический и ожидаемый then
  await expect(page.getByRole('navigation')).toContainText('sni14092026@ya.ru');

});
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('file:///C:/Users/marin/pw8/tests/burger-order.html');
  await page.locator('body').press('CapsLock');
  await page.getByRole('textbox', { name: 'Имя клиента:' }).click();
  await page.getByRole('textbox', { name: 'Имя клиента:' }).fill('МАРИНА');
  // Альтернативные варианты локаторов от учителя:
  //await page.locator('#customerName').click();
  //await page.locator('#customerName').fill('МАРИНА
  //await page.locator('.form-group').filter({ hasText: 'Введите ваше имя' }).click();
  //await page.locator('.form-group').filter({ hasText: 'Введите ваше имя' }).fill('МАРИНА
  
  //await page.getByPlaceholder('Введите ваше имя:').click();
  //await page.getByPlaceholder('Введите ваше имя:').fill('МАРИНА
  //await page.getByText('Введите ваше имя').click();
  //await page.getByText('Введите ваше имя').fill('МАРИНА

  // Установка остальных параметров заказа:
  await page.getByLabel('Тип бургера:').selectOption('cheeseburger');
  await page.getByText('Большой').click();
  await page.getByRole('radio', { name: 'Большой' }).check();
  await page.getByRole('checkbox', { name: 'Горчица' }).check();
  await page.locator('span').first().click();
  await page.getByRole('checkbox', { name: 'Да' }).check();
  await page.getByRole('button', { name: '+' }).click({
    clickCount: 3
  });
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByText('Картой онлайн').click();
  await page.getByRole('radio', { name: 'Картой онлайн' }).check();
  await page.getByRole('button', { name: 'Заказать бургер' }).click();
  await expect(page.locator('#popupMessage')).toContainText('Спасибо за заказ, МАРИНА!');
});
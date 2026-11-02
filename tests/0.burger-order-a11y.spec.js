import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('file:///C:/Users/marin/pw8/tests/burger-order-a11y.html');
  await page.getByRole('heading', { name: 'Заказ бургера' }).click();
  await page.getByText('Имя клиента').click();
  await page.getByRole('textbox', { name: 'Имя клиента' }).click();
  await page.getByRole('textbox', { name: 'Имя клиента' }).click();
  await page.getByRole('textbox', { name: 'Имя клиента' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Имя клиента' }).fill('MARINA');
  await page.getByLabel('Тип бургера').selectOption('vegan');
  await page.getByText('Тип бургера').click();
  await page.getByText('Большой').click();
  await page.getByRole('radio', { name: 'Большой' }).check();
  await page.getByText('Горчица').click();
  await page.getByRole('checkbox', { name: 'Горчица' }).check();
  await page.locator('span').first().click();
  await page.getByRole('switch', { name: 'Заказ с собой' }).check();
  await page.getByRole('button', { name: 'Увеличить количество' }).click({
    clickCount: 3
  });
  await page.getByText('Картой онлайн').click();
  await page.getByRole('radio', { name: 'Картой онлайн' }).check();
  await page.getByRole('button', { name: 'Заказать бургер' }).click();
  await page.getByRole('button', { name: 'Закрыть' }).click();
  await page.getByRole('button', { name: 'Заказать бургер' }).click();
  await page.getByText('Спасибо за заказ, MARINA!').click();
  await page.getByText('Ваш заказ будет готов в течение 20–30 минут').click();
  await page.getByRole('button', { name: 'Закрыть' }).click();
});
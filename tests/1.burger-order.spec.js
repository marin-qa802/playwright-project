import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('file:///C:/Users/marin/pw8/tests/burger-order.html');
  await page.getByRole('textbox', { name: 'Имя клиента:' }).click();
  await page.getByRole('textbox', { name: 'Имя клиента:' }).fill('marin');
  await page.getByRole('textbox', { name: 'Имя клиента:' }).press('ArrowDown');
  await page.getByLabel('Тип бургера:').selectOption('vegan');
  await page.getByRole('radio', { name: 'Средний' }).check();
  await page.getByRole('checkbox', { name: 'Горчица' }).check();
  await page.locator('span').first().click();
  await page.getByRole('checkbox', { name: 'Да' }).check();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('button', { name: '+' }).dblclick();
  await page.getByText('Картой онлайн').click();
  await page.getByRole('radio', { name: 'Картой онлайн' }).check();
  await page.getByRole('button', { name: 'Заказать бургер' }).click();
  await page.getByRole('button', { name: 'Закрыть' }).click();
});

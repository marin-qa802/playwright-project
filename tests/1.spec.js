import { test, expect } from '@playwright/test';
import path from 'path';

test('test', async ({ page }) => {
  // Динамически получаем правильный путь к локальному HTML-файлу на Windows
  const filePath = `file://${path.resolve('burger-order.html')}`;
  await page.goto(filePath);

  // Заполнение имени клиента (клик происходит автоматически)
  await page.getByRole('textbox', { name: 'Имя клиента:' }).fill('Sniper');

  // Выбор параметров бургера
  await page.locator('[for="burgerType"]').selectOption('cheeseburger');
  await page.getByRole('radio', { name: 'Маленький' }).check();
  await page.getByRole('checkbox', { name: 'Горчица' }).check();

  // Дополнительные клики и опции из вашего теста
  await page.locator('span').first().click();
  await page.getByRole('checkbox', { name: 'Да' }).check();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('radio', { name: 'Картой онлайн' }).check();

  // Отправка формы заказа
  await page.getByRole('button', { name: 'Заказать бургер' }).click();

  // Проверка успешного сообщения
  await expect(page.locator('#popupMessage')).toContainText('Спасибо за заказ, Марина!');
});

import { test, expect } from '@playwright/test';
import path from 'path';

test('Пользователь может заказать бургер', async ({ page }) => {
  // Динамически получаем правильный путь к локальному HTML-файлу в папке tests
  const filePath = `file://${path.resolve('tests/burger-order.html')}`;
  await page.goto(filePath);

  // Заполнение имени клиента
await page.getByRole('textbox', { name: 'Имя клиента:' }).fill('Марина');

  // Выбор параметров бургера
  await page.locator('[for="burgerType"]').selectOption('cheeseburger');
  await page.getByRole('radio', { name: 'Маленький' }).check();
  await page.getByRole('checkbox', { name: 'Горчица' }).check();

  // Дополнительные клики и опции из вашего теста
  await page.locator('span').first().click();
  await page.getByRole('checkbox', { name: 'Да' }).check();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('radio', { name: 'Картой онлайн' }).check();

  // Клик по кнопке оформления заказа (добавьте, если нужно нажать кнопку заказа)
  // await page.getByRole('button', { name: 'Оформить заказ' }).click();
// Замените строчку 25 на этот более простой и надежный вариант:
await page.getByRole('button', { name: 'Заказать бургер' }).click();

  // Проверка успешного сообщения
  await expect(page.locator('#popupMessage')).toContainText('Спасибо за заказ, Марина!');
});

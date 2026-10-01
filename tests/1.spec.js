import { test, expect } from '@playwright/test';
import path from 'path';

test('Пользователь может заказать бургер', async ({ page }) => {
  // 1. Обязательно создаем переменную filePath перед ее использованием
  const filePath = `file://${path.resolve('tests/burger-order.html')}`;
  
  // 2. Теперь переход по адресу сработает без ошибок
  await page.goto(filePath);
  
  // 3. Заполнение формы
  await page.getByPlaceholder('Введите ваше имя').fill('Марина');
  await page.locator('[for="burgerType"]').selectOption('cheeseburger');
  
  // Выбираем размер порции
  await page.getByRole('radio', { name: 'Маленький' }).check();
  
  // Добавляем горчицу
  await page.getByRole('checkbox', { name: 'Горчица' }).check();

  // Дополнительные клики и опции
  await page.locator('span').first().click();
  await page.getByRole('checkbox', { name: 'Да' }).check();
  await page.getByRole('button', { name: '+' }).click();
  await page.getByRole('radio', { name: 'Картой онлайн' }).check();

  // Отправка формы и проверка
  await page.getByRole('button', { name: 'Заказать бургер' }).click();
  await expect(page.locator('#popupMessage')).toContainText('Спасибо за заказ, Марина!');
  
});

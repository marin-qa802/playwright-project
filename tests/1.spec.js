import { test, expect } from '@playwright/test';
import path from 'path';
// 1. Импортируем установленную библиотеку
import { faker } from '@faker-js/faker';

// 2. Создаем генератор случайного имени
const randomName = faker.person.fullName();

test('Пользователь может заказать бургер', async ({ page }) => {
  const filePath = `file://${path.resolve('tests/burger-order.html')}`;
  await page.goto(filePath);

  // 3. Заполнение формы случайным именем
  await page.getByPlaceholder('Введите ваше имя').fill(randomName);
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

  // Отправка формы
  await page.getByRole('button', { name: 'Заказать бургер' }).click();

  // 4. Проверяем сообщение, подставляя то же самое случайное имя:
  await expect(page.locator('#popupMessage')).toContainText(`Спасибо за заказ, ${randomName}`);
});


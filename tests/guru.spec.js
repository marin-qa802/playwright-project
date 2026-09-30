import { test, expect } from '@playwright/test';

test('register, verify user name, logout and verify sign up form', async ({ page }) => {
  // 1. Открываем главную страницу и форму регистрации
  await page.goto('https://realworld.qa.guru/');
  await page.getByRole('link', { name: 'Sign up' }).click();

  // 2. Инициализируем элементы формы
  const nameInput = page.getByRole('textbox', { name: 'Your Name' });
  const emailInput = page.getByRole('textbox', { name: 'Email' });
  const passwordInput = page.getByRole('textbox', { name: 'Password' });
  const signUpButton = page.getByRole('button', { name: 'Sign up' });

  // ИСПРАВЛЕНИЕ: Убрали экранирование \$, чтобы Email генерировался корректно
  const uniqueEmail = `test_${Math.random().toString(36).substring(2, 11)}@example.com`;

  // 3. Заполняем форму валидными уникальными данными
  await nameInput.fill('Test User');
  await emailInput.fill(uniqueEmail);
  await passwordInput.fill('StrongPassword123');

  // ИСПРАВЛЕНИЕ: Перехватываем запрос регистрации по правильному синтаксису Playwright
  const responsePromise = page.waitForResponse(resp => resp.url().endsWith('/users'));

  // 4. Отправляем форму регистрации
  await signUpButton.click();

  // 5. Ждем ответа от бэкенд-сервера
  const response = await responsePromise;
  if (response.status() >= 400) {
    const errorData = await response.json();
    throw new Error(`Регистрация не удалась: ${JSON.stringify(errorData)}`);
  }

  // 6. Ждём скрытия полей ввода (подтверждение успешного редиректа на главную)
  await expect(nameInput).not.toBeVisible({ timeout: 10000 });
  await expect(emailInput).not.toBeVisible({ timeout: 10000 });
  await expect(passwordInput).not.toBeVisible({ timeout: 10000 });

  // 7. Находим имя пользователя внутри контейнера панели навигации по тексту
  const userNameLink = page.locator('.navbar-nav').getByText('Test User');
  await expect(userNameLink).toBeVisible({ timeout: 5000 });

  // 8. Выполняем выход из профиля (Logout)
  await userNameLink.click();
  // Флаг force: true помогает избежать блокировок от незавершенных анимаций меню
  await page.getByRole('link', { name: 'Logout' }).click({ force: true });

  // 9. Финальные проверки разлогинивания
  await expect(userNameLink).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign up' })).toBeVisible();
});

import { test as base } from '@playwright/test';
// Проверьте путь к App! Из src/helpers/fixtures/ до src/pages/ нужно подняться на два уровня вверх
import { App } from '../../pages/app.page.js'; 

export const test = base.extend({
  // Имя свойства - это имя фикстуры. Оно должно быть 'app'
  app: async ({ page }, use) => {
    const app = new App(page);
    // Передаем app в тест
    await use(app);
  },
});

// Добавьте эту строку:
export { expect } from '@playwright/test'; 
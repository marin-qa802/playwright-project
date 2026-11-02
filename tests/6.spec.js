import { test, expect } from '@playwright/test';
import { superadminPassword, UserBuilder } from '../src/helpers/index.js';
import { App } from '../src/pages/app.page';

 test('Пользователь может зарегистрироваться используя email и пароль ', async ({ page }) => {
    // act подготовка данных

    const user = new UserBuilder().withEmail().withPassword(12).withName().build();

    const app = new App(page);

    await app.main.open();
    await app.main.signup();
    // todo
    await app.register.register(user);    

// простой
  await expect(app.yourFeed.getProfileName()).toContainText(user.name);

});
 test('Еще некий тест на регистрацию', {
  tag: '@fast',
}, async ({ page }) => {
    // act подготовка данных
    const user = new UserBuilder().withEmail().withPassword(12).withName().build();
    const app = new App(page);

    await app.main.open();

    await app.main.signup();
    // todo
    await app.register.register(user);    

// простой
  await expect(app.yourFeed.getProfileName()).toContainText(user.name);


 });
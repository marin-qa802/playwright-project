import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { YourFeedPage } from '../src/pages/yourfeed.page';

 test('Пользователь может зарегистрироваться используя email и пароль ', async ({ page }) => {
    // act подготовка данных
    const user = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password:  faker.internet.password()
}

    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const yourFeed = new YourFeedPage(page);

    await main.open();
    await main.signup();
    await register.register(user);    

// простой
  //  await expect(yourFeed.profileText).toContainText(user.name);
  await expect(yourFeed.getProfileName()).toContainText(user.name);

   // await expect(page.getByRole('navigation')).toContainText(user.name);

});
import { test } from '@playwright/test'; // Импортируем test для step

const URL = 'https://realworld.qa.guru/';

export class MainPage {
  constructor(page) {
    this.page = page;
    this.signupLink = page.getByRole('link', { name: 'Sign up' });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async open() {
    await test.step('Открыть главную страницу', async () => {
      await this.page.goto(URL);
    });
  }

  async signup() {
    await test.step('Перейти на страницу регистрации', async () => {
      await this.signupLink.click();
    });
  }

  async goToNewArticle() {
    await test.step('Перейти на страницу создания статьи', async () => {
      await this.newArticleLink.click();
    });
  }
}
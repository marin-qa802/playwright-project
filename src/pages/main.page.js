const URL = 'https://realworld.qa.guru/';

export class MainPage {
  constructor(page) {
    this.page = page;
    this.signupLink = page.getByRole('link', { name: 'Sign up' });
    this.newArticleLink = page.getByRole('link', { name: 'New Article' });
  }

  async open() {
    await this.page.goto(URL);
  }

  async signup() {
    await this.signupLink.click();
  }

  async goToNewArticle() {
    await this.newArticleLink.click();
  }
}
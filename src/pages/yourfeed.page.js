export class YourFeedPage {
  constructor(page) {
    // техническое описание страницы браузером
    // описание браузера
    this.page = page;
    // под тестовый тип элемента
    this.profileText = page.getByRole('navigation');
  }

  getProfileName() {
    return this.profileText;
  }
}
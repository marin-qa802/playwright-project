export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.editBodyInput = page.getByRole('textbox', { name: "Write your article (in" });
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
  }

  async updateArticle(newBody) {
    await this.editBodyInput.fill(newBody);
    await this.updateArticleButton.click();
    // Ждем перехода обратно на страницу статьи
    await this.page.waitForURL(/\/article\//);
  }
}
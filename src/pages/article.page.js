export class ArticlePage {
  constructor(page) {
    this.page = page;
    // Форма создания статьи
    this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
    this.descriptionInput = page.getByRole('textbox', { name: "What's this article about?" });
    this.bodyInput = page.getByRole('textbox', { name: 'Write your article (in' });
    this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
  }

  async createArticle(title, description, body, tags) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
    if (tags) await this.tagsInput.fill(tags);
    await this.publishButton.click();
  }
}
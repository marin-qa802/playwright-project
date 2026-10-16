export class ArticlePage {
  constructor(page) {
    this.page = page;
    // Форма создания/редактирования
    this.titleInput = page.getByRole('textbox', { name: 'Article Title' });
    this.descriptionInput = page.getByRole('textbox', { name: "What's this article about?" });
    this.bodyInput = page.getByRole('textbox', { name: 'Write your article (in' });
    this.tagsInput = page.getByRole('textbox', { name: 'Enter tags' });
    
    // Кнопки
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
    
    // Контент статьи
    this.articleContent = page.locator('.article-content');
    
    // Комментарии
    this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    
    // Кнопки редактирования/удаления статьи
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' }).first();
    this.deleteArticleButton = page.getByRole('button', { name: 'Delete Article' }).first();
  }

  async createArticle(title, description, body, tags) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
    if (tags) await this.tagsInput.fill(tags);
    await this.publishButton.click();
  }

  async editArticle(newBody) {
    await this.editArticleButton.click();
    await this.bodyInput.fill(newBody);
    await this.updateArticleButton.click();
  }

  async deleteArticle() {
    // 1. Подписываемся на диалоговое окно и подтверждаем удаление (OK)
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept(); // <-- accept = нажать OK
    });
    
    // 2. Кликаем по кнопке удаления
    await this.deleteArticleButton.click();
  }

  async addComment(text) {
    await this.commentInput.fill(text);
    await this.postCommentButton.click();
  }

  async deleteComment() {
    // 1. Находим последний комментарий и наводим на него (чтобы появилась иконка корзины)
    const lastComment = this.page.locator('.card').last();
    await lastComment.hover();

    // 2. Ищем иконку корзины внутри этого комментария
    const trashIcon = lastComment.locator('.ion-trash-a');
    await trashIcon.waitFor({ state: 'visible', timeout: 5000 });

    // 3. Подписываемся на диалог (если появится) и подтверждаем
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });

    // 4. Кликаем по иконке корзины
    await trashIcon.click();
  }
}
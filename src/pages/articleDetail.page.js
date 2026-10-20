export class ArticleDetailPage {
  constructor(page) {
    this.page = page;
    this.articleBody = page.locator('.article-content p').first(); 
    this.editArticleButton = page.getByRole("link", { name: "Edit Article" }).first();
    this.deleteArticleButton = page.getByRole("button", { name: "Delete Article" }).first();
    this.commentInput = page.getByRole("textbox", { name: "Write a comment..." });
    this.postCommentButton = page.getByRole("button", { name: "Post Comment" });
    this.commentCards = page.locator(".card");
  }

  async getArticleBodyText() {
    await this.articleBody.waitFor({ state: 'visible' });
    return await this.articleBody.innerText();
  }

  async goToEditArticle() {
    await this.editArticleButton.click();
  }

  async deleteArticle() {
    this.page.once("dialog", async (dialog) => await dialog.accept());
    await this.deleteArticleButton.click();
    await this.page.waitForURL(/.*#\//);
  }

  async addComment(text) {
    await this.commentInput.fill(text);
    await this.postCommentButton.click();
  }

  getCommentLocator(text) {
    return this.commentCards.filter({ hasText: text });
  }

  async deleteCommentByText(text) {
    const comment = this.getCommentLocator(text);
    await comment.hover();
    this.page.once("dialog", async (dialog) => await dialog.accept());
    await comment.locator(".ion-trash-a").click();
  }
}
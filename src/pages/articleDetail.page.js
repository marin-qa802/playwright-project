import { expect } from "@playwright/test";

export class ArticleDetailPage {
  constructor(page) {
    this.page = page;

    // --- Контент статьи ---
    this.articleContent = page.locator(".article-content");

    // --- Кнопки редактирования/удаления статьи ---
    this.editArticleButton = page
      .getByRole("link", { name: "Edit Article" })
      .first();
    this.deleteArticleButton = page
      .getByRole("button", { name: "Delete Article" })
      .first();

    // --- Форма редактирования ---
    this.editBodyInput = page.getByRole("textbox", {
      name: "Write your article (in",
    });
    this.updateArticleButton = page.getByRole("button", {
      name: "Update Article",
    });

    // --- Комментарии ---
    this.commentInput = page.getByRole("textbox", {
      name: "Write a comment...",
    });
    this.postCommentButton = page.getByRole("button", { name: "Post Comment" });
    this.commentCards = page.locator(".card"); // Геттер для всех карточек
  }

  // --- Действия со статьей ---
  async editArticle(newBody) {
    await this.editArticleButton.click();
    await this.editBodyInput.fill(newBody);
    await this.updateArticleButton.click();
  }

  async deleteArticle() {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
    await this.deleteArticleButton.click();
  }

  // --- Проверки статьи (инкапсуляция локаторов) ---
  async expectArticleContentToContain(text) {
    await expect(this.articleContent).toContainText(text);
  }

  // --- Действия с комментариями ---
  async addComment(text) {
    await this.commentInput.fill(text);
    await this.postCommentButton.click();
  }

  async deleteCommentByText(text) {
    // Ищем комментарий по уникальному тексту (без .last())
    const comment = this.commentCards.filter({ hasText: text });
    await comment.hover(); // Наводим, чтобы появилась корзина

    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });

    // Локатор иконки привязан к конкретному комментарию
    await comment.locator(".ion-trash-a").click();
  }

  // --- Проверки комментариев (инкапсуляция локаторов) ---
  async expectCommentToContain(text) {
    await expect(this.commentCards.last()).toContainText(text);
  }

  async expectCommentNotExists(text) {
    await expect(this.commentCards.filter({ hasText: text })).toHaveCount(0);
  }
}

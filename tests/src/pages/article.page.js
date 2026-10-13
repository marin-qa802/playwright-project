// мы создаем класс, который описывает страницу статьи
export class ArticlePage {
    // конструктор, который принимает объект page (браузерную вкладку)
    constructor(page) {
        this.page = page; // сохраняем ссылку на страницу, чтобы использовать её в методах
        this.articleContent = page.locator('.article-content'); // это локатор для блока с текстом статьи(тесте №4)
        this.commentForm = page.locator('.comment-form'); // окатор для формы комментариев(тесте №4)
    }
}
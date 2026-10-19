import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { ArticlePage } from '../src/pages/article.page';
import { ArticleDetailPage } from '../src/pages/articleDetail.page'; // Новый импорт
import { RegisterPage } from '../src/pages/register.page';

const user = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
};

test.describe('Домашнее задание: 5 функциональных тестов', () => {
  let mainPage;
  let articlePage;
  let articleDetailPage;
  let registerPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    articlePage = new ArticlePage(page);
    articleDetailPage = new ArticleDetailPage(page);
    registerPage = new RegisterPage(page);

    await mainPage.open();
    await mainPage.signup();
    await registerPage.register(user);
    // Убрали waitForURL — он теперь внутри register()
  });

  test('1. Создание новой статьи', async () => {
    await mainPage.goToNewArticle();
    const bodyText = 'Текст новой статьи ' + Date.now();
    await articlePage.createArticle('Статья ' + Date.now(), 'Описание', bodyText, 'тег');

    await articleDetailPage.expectArticleContentToContain(bodyText);
  });

  test('2. Редактирование статьи', async () => {
    await mainPage.goToNewArticle();
    await articlePage.createArticle('Старая статья ' + Date.now(), 'Описание', 'Старый текст', 'тег');

    const newBody = 'Новый обновленный текст ' + Date.now();
    await articleDetailPage.editArticle(newBody);

    await articleDetailPage.expectArticleContentToContain(newBody);
  });

  test('3. Удаление статьи', async ({ page }) => {
    await mainPage.goToNewArticle();
    await articlePage.createArticle('Статья на удаление ' + Date.now(), 'Описание', 'Текст', 'тег');

    await articleDetailPage.deleteArticle();

    await expect(page).toHaveURL(/.*#\//);
  });

  test('4. Добавление комментария к статье', async () => {
    await mainPage.goToNewArticle();
    await articlePage.createArticle('Статья для комментариев ' + Date.now(), 'Описание', 'Текст', 'тег');

    const commentText = 'Отличная статья! ' + Date.now();
    await articleDetailPage.addComment(commentText);

    await articleDetailPage.expectCommentToContain(commentText);
  });

  test('5. Удаление комментария', async () => {
    await mainPage.goToNewArticle();
    await articlePage.createArticle('Статья для удаления комментария ' + Date.now(), 'Описание', 'Текст', 'тег');

    const commentText = 'Комментарий на удаление ' + Date.now();
    await articleDetailPage.addComment(commentText);

    // Вместо waitForTimeout(1000) — expect сам подождет появления
    await articleDetailPage.expectCommentToContain(commentText);

    await articleDetailPage.deleteCommentByText(commentText);

    await articleDetailPage.expectCommentNotExists(commentText);
  });
});
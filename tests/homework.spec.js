import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import { NewArticlePage } from '../src/pages/newArticle.page';
import { EditArticlePage } from '../src/pages/editArticle.page';
import { ArticleDetailPage } from '../src/pages/articleDetail.page';

const user = {
  email: faker.internet.email(),
  name: faker.person.fullName(),
  password: faker.internet.password(),
};

test.describe('Домашнее задание: 5 функциональных тестов', () => {
  let mainPage;
  let registerPage;
  let newArticlePage;
  let editArticlePage;
  let articleDetailPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    registerPage = new RegisterPage(page);
    newArticlePage = new NewArticlePage(page);
    editArticlePage = new EditArticlePage(page);
    articleDetailPage = new ArticleDetailPage(page);

    await mainPage.open();
    await mainPage.signup();
    await registerPage.register(user);
    
    // Проверка успешной регистрации (перенесли из пейджа)
    await expect(page).toHaveURL(/.*#\//);
  });

  test('1. Создание новой статьи', async () => {
    await mainPage.goToNewArticle();
    const bodyText = 'Текст новой статьи ' + Date.now();
    await newArticlePage.createArticle('Статья ' + Date.now(), 'Описание', bodyText, 'тег');

    const actualBody = await articleDetailPage.getArticleBodyText();
    expect(actualBody).toContain(bodyText);
  });

  test('2. Редактирование статьи', async () => {
    await mainPage.goToNewArticle();
    await newArticlePage.createArticle('Старая статья ' + Date.now(), 'Описание', 'Старый текст', 'тег');

    const newBody = 'Новый обновленный текст ' + Date.now();
    
    await articleDetailPage.goToEditArticle(); 
    await editArticlePage.updateArticle(newBody);

    const actualBody = await articleDetailPage.getArticleBodyText();
    expect(actualBody).toContain(newBody);
  });

  test('3. Удаление статьи', async ({ page }) => {
    await mainPage.goToNewArticle();
    await newArticlePage.createArticle('Статья на удаление ' + Date.now(), 'Описание', 'Текст', 'тег');

    await articleDetailPage.deleteArticle();

    await expect(page).toHaveURL(/.*#\//);
  });

  test('4. Добавление комментария к статье', async () => {
    await mainPage.goToNewArticle();
    await newArticlePage.createArticle('Статья для комментариев ' + Date.now(), 'Описание', 'Текст', 'тег');

    const commentText = 'Отличная статья! ' + Date.now();
    await articleDetailPage.addComment(commentText);

    await expect(articleDetailPage.getCommentLocator(commentText)).toBeVisible();
  });

  test('5. Удаление комментария', async () => {
    await mainPage.goToNewArticle();
    await newArticlePage.createArticle('Статья для удаления комментария ' + Date.now(), 'Описание', 'Текст', 'тег');

    const commentText = 'Комментарий на удаление ' + Date.now();
    await articleDetailPage.addComment(commentText);

    await expect(articleDetailPage.getCommentLocator(commentText)).toBeVisible();

    await articleDetailPage.deleteCommentByText(commentText);

    // Используем toHaveCount(0) для проверки удаления
    await expect(articleDetailPage.getCommentLocator(commentText)).toHaveCount(0); 
  });
});
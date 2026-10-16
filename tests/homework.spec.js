import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage } from '../src/pages/main.page';
import { ArticlePage } from '../src/pages/article.page';
import { RegisterPage } from '../src/pages/register.page';

// Генерируем данные пользователя
const user = {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password: faker.internet.password(),
};

test.describe('Домашнее задание: 5 функциональных тестов', () => {
    let mainPage;
    let articlePage;
    let registerPage;

    test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        articlePage = new ArticlePage(page);
        registerPage = new RegisterPage(page);

        // Регистрация нового пользователя перед каждым тестом
        await mainPage.open();
        await mainPage.signup();
        await registerPage.register(user);
        
        // Ждём загрузки главной страницы
        await page.waitForURL('https://realworld.qa.guru/#/');
    });

    test('1. Создание новой статьи', async ({ page }) => {
        await mainPage.goToNewArticle();
        
        const bodyText = 'Текст новой статьи ' + Date.now();
        await articlePage.createArticle('Статья ' + Date.now(), 'Описание', bodyText, 'тег');
        
        await expect(articlePage.articleContent).toContainText(bodyText);
    });

    test('2. Редактирование статьи', async ({ page }) => {
        await mainPage.goToNewArticle();
        await articlePage.createArticle('Старая статья ' + Date.now(), 'Описание', 'Старый текст', 'тег');
        
        await articlePage.editArticle('Новый обновленный текст ' + Date.now());
        
        await expect(articlePage.articleContent).toContainText('Новый обновленный текст');
    });

    test('3. Удаление статьи', async ({ page }) => {
        await mainPage.goToNewArticle();
        await articlePage.createArticle('Статья на удаление ' + Date.now(), 'Описание', 'Текст', 'тег');
        
        await articlePage.deleteArticle();
        
        // Проверяем, что вернулись на главную страницу
        await expect(page).toHaveURL('https://realworld.qa.guru/#/');
    });

    test('4. Добавление комментария к статье', async ({ page }) => {
        await mainPage.goToNewArticle();
        await articlePage.createArticle('Статья для комментариев ' + Date.now(), 'Описание', 'Текст', 'тег');
        
        const commentText = 'Отличная статья! ' + Date.now();
        await articlePage.addComment(commentText);
        
        // Проверяем, что комментарий появился
        await expect(page.locator('.card-text').last()).toContainText(commentText);
    });

    test('5. Удаление комментария', async ({ page }) => {
    await mainPage.goToNewArticle();
    await articlePage.createArticle('Статья для удаления комментария ' + Date.now(), 'Описание', 'Текст', 'тег');
    
    const commentText = 'Комментарий на удаление ' + Date.now();
    await articlePage.addComment(commentText);
    
    // Даем время комментарию появиться
    await page.waitForTimeout(1000);
    
    // Удаляем
    await articlePage.deleteComment();
    
    // Проверяем, что карточки (комментария) с нашим текстом больше нет
    await expect(page.locator('.card').filter({ hasText: commentText })).toHaveCount(0);
   });
});
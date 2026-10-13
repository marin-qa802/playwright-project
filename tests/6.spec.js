import { test, expect } from '@playwright/test'; // test создает тест-кейс, а expect используется для проверок (ассертов)
import { MainPage } from './src/pages/main.page'; // класс (Page Object), который описывает страницу сайта
import { ArticlePage } from './src/pages/article.page'; // класс (Page Object), который описывает страницу сайта

test.describe('Функциональные тесты для realworld.qa.guru', () => { // это контейнер, который группирует тесты по смыслу
    let mainPage;
    let articlePage;

    test.beforeEach(async ({ page }) => { //это хук, который выполняется перед каждым тестом в этом блоке
       // экземпляры классов MainPage и ArticlePage, передавая им объект page (текущую вкладку браузера)
        mainPage = new MainPage(page);
        articlePage = new ArticlePage(page);
        await mainPage.open(); // Открываем главную страницу сайта
    });

    // Тест 1: Проверка отображения глобальной ленты
    // Проверяем, что страница загрузилась корректно
    // Мы проверяем, что виден заголовок "Global Feed" и хотя бы одна статья в списке
    test('Отображение заголовка Global Feed и списка статей', async () => {
        await expect(mainPage.globalFeedTitle).toBeVisible();
        await expect(mainPage.articleList.first()).toBeVisible();
    });

        // Тест 2: Фильтрация по тегу
        // Кликаем на тег "harum" в сайдбаре и проверяем, что лента отфильтровалась
        test('Фильтрация статей по тегу из Popular Tags', async ({ page }) => {
        await mainPage.clickTag('harum');
        
        // Проверяем, что заголовок ленты изменился на "# harum"
        // (Это надежнее, чем проверка URL, так как сайт может не менять адрес)
        await expect(page.locator('.feed-toggle')).toContainText('harum');
        
        // Дополнительно: убедимся, что статьи всё еще отображаются
        await expect(mainPage.articleList.first()).toBeVisible();
    });
        // Тест 3: Пагинация
    test('Переход на вторую страницу пагинации', async ({ page }) => {
        // Проверяем, что кнопка "2" видна, кликаем по ней и убеждаемся, что она стала активной (получила класс .active)
        await expect(mainPage.pagination.getByText('2', { exact: true })).toBeVisible();
        
        // Кликаем
        await mainPage.clickPageNumber('2');
        
        // Проверяем, что кнопка "2" стала активной (имеет класс active)
        await expect(mainPage.pagination.locator('.active')).toContainText('2');
    });

        // Тест 4: Переход на страницу статьи
    test('Переход на страницу статьи по ссылке Read more', async ({ page }) => {
        // Сначала проверим, что ссылки вообще есть
        await expect(mainPage.readMoreLinks.first()).toBeVisible();
        
        // Кликаем
        await mainPage.clickReadMore(0);
        
        // Проверяем, что появился блок с контентом статьи (не обязательно URL)
        await expect(articlePage.articleContent).toBeVisible();
    });

        // Тест 5: Проверка клика на Favorite без авторизации
    test('Клик на Favorite без авторизации не меняет страницу', async ({ page }) => {
    // Добавляем обработчик для всплывающего окна
    page.on('dialog', async dialog => {
        console.log(`Всплывающее окно: ${dialog.message()}`); // Для отладки
        await dialog.accept(); // Нажимаем "OK"
    });

    const initialUrl = page.url();
    await mainPage.clickFavorite(0);
    
    await expect(page).not.toHaveURL(/.*login/);
    await expect(page).toHaveURL(initialUrl);
});
});
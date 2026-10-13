const URL = 'https://realworld.qa.guru/';

export class MainPage {
    constructor(page) {
        this.page = page;
        // Существующие локаторы
        this.signupLink = page.getByRole('link', { name: 'Sign up' });
        
        // Локаторы для функциональных тестов
        this.globalFeedTitle = page.getByText('Global Feed');
        this.articleList = page.locator('.article-preview');
        this.popularTags = page.locator('.tag-list');
        this.pagination = page.locator('.pagination');
        this.readMoreLinks = page.getByText('Read more...');
        this.favoriteButtons = page.locator('.btn-outline-primary');
    }

    async open() {
        await this.page.goto(URL);
    }

    async signup() {
        await this.signupLink.click();
    }

    async clickTag(tagName) {
        await this.popularTags.getByText(tagName).click();
    }

    async clickPageNumber(number) {
        await this.pagination.getByText(number, { exact: true }).click();
    }

    async clickReadMore(index = 0) {
        await this.readMoreLinks.nth(index).click();
    }

    async clickFavorite(index = 0) {
        await this.favoriteButtons.nth(index).click();
    }
}
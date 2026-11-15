import { test, expect } from '@playwright/test';

test('Проверка поиска на Яндексе', async ({ page }) => {
    await page.goto('https://yandex.ru');

    await page.locator('button[aria-label="Закрыть"]').click();
    await page.locator('div[role="dialog"]').waitFor({ state: 'hidden' });
    await searchInput.fill('python');   

    // 1. Ждем появления окна "Продолжить" и кликаем по нему
    const continueButton = page.getByRole('button', { name: 'Продолжить' });
    
    // Проверяем, видна ли кнопка (на случай, если окна нет)
    if (await continueButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await continueButton.click();
        // Небольшая пауза, чтобы окно исчезло
        await page.waitForTimeout(1000);
    }

    // 2. Теперь ищем поле поиска и вводим текст
    const searchInput = page.locator('input[name="text"]');
    await searchInput.fill('python');
    await searchInput.press('Enter');

    // 3. Проверяем, что URL изменился
    await page.waitForURL(/text=python/);
    expect(page.url()).toContain('text=python');
});
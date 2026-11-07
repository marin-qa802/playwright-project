import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';
const token = 'c3baa54a-7e9c-4b27-b992-69d757cf5b46'; // Ваш токен

test('Задание 13: Сортировка по заголовку (по возрастанию)', async ({ request }) => {
  const response = await request.get(`${urlApi}/api/todos?_sortBy=title`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Проверяем, что заголовки идут по алфавиту
    const titles = body.todos.map(t => t.title);
    const sortedTitles = [...titles].sort(); // Копируем и сортируем для сравнения
    expect(titles).toEqual(sortedTitles);
});
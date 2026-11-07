import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';
const token = 'c3baa54a-7e9c-4b27-b992-69d757cf5b46'; // Ваш токен из браузера

test('Задание 17: Лимит на выдачу (8 элементов)', async ({ request }) => {
const response = await request.get(`${urlApi}/api/todos?_limit=8`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Проверяем, что вернулось ровно 8 задач
    expect(body.todos.length).toBe(8);
});
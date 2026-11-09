import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';
const token = 'c3baa54a-7e9c-4b27-b992-69d757cf5b46'; // Ваш токен

// Задание 17: Лимит (получить 8 задач)
test('Задание 17: ?_limit (8 элементов)', async ({ request }) => {
    const response = await request.get(`${urlApi}/api/todos?_limit=8`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Проверяем, что вернулось ровно 8 задач
    expect(body.todos.length).toBe(8);
});

// Задание 18: Лимит и смещение (пропустить 5, взять 5)
test('Задание 18: ?_limit=5&_offset=5', async ({ request }) => {
    const response = await request.get(`${urlApi}/api/todos?_limit=5&_offset=5`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Проверяем, что вернулось ровно 5 задач
    expect(body.todos.length).toBe(5);
});

// Задание 19: Лимит больше максимального (ожидаем 400)
test('Задание 19: ?_limit больше максимума (400)', async ({ request }) => {
    // В документации сказано, что максимум 20. Пробуем 21.
    const response = await request.get(`${urlApi}/api/todos?_limit=21`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    // Ожидаем ошибку 400 Bad Request
    expect(response.status()).toBe(400);
});
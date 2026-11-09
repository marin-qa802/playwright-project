import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';
const token = 'c3baa54a-7e9c-4b27-b992-69d757cf5b46'; // Ваш токен

// Задание 07: Фильтрация по doneStatus=true
test('Задание 07: Фильтр по doneStatus=true', async ({ request }) => {
    const response = await request.get(`${urlApi}/api/todos?doneStatus=true`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Проверяем, что все задачи выполнены
    body.todos.forEach(todo => {
        expect(todo.doneStatus).toBe(true);
    });
});

// Задание 08: Фильтрация по ID (больше чем)
test('Задание 08: Фильтр по id больше заданного значения', async ({ request }) => {
    // Используем символ > в URL
    const response = await request.get(`${urlApi}/api/todos?id>2`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Проверяем, что вернулись только задачи с ID > 2
    body.todos.forEach(todo => {
        expect(todo.id).toBeGreaterThan(2);
    });
});

// Задание 09: Фильтрация по ID (меньше чем)
test('Задание 09: Фильтр по id меньше заданного значения', async ({ request }) => {
    // Используем символ < в URL
    const response = await request.get(`${urlApi}/api/todos?id<5`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    
    // Проверяем, что вернулись только задачи с ID < 5
    body.todos.forEach(todo => {
        expect(todo.id).toBeLessThan(5);
    });
});
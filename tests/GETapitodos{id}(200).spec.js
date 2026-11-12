import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';

test('Задание 05: Получение конкретной задачи по ID', async ({ request }) => {
    // 1. Создаем новую сессию (получаем свежий токен)
    const authResponse = await request.post(`${urlApi}/api/challenger`, {
        headers: { 'Accept': 'application/json' }
    });
    const token = authResponse.headers()['x-challenger'];

    // 2. Создаем задачу
    let response = await request.post(`${urlApi}/api/todos`, {
        headers: { 'X-CHALLENGER': token, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        data: { title: "Для поиска", doneStatus: false, description: "test" }
    });
    const createdTodo = await response.json();

    // 3. Ищем её по ID
    response = await request.get(`${urlApi}/api/todos/${createdTodo.id}`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.todos[0].id).toBe(createdTodo.id);
});
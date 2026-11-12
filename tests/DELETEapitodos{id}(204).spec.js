import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';

test('Задание 41: Удаление задачи', async ({ request }) => {
    // 1. Создаем новую сессию (получаем свежий токен)
    const authResponse = await request.post(`${urlApi}/api/challenger`, {
        headers: { 'Accept': 'application/json' }
    });
    const token = authResponse.headers()['x-challenger'];

    // 2. Создаем задачу
    let response = await request.post(`${urlApi}/api/todos`, {
        headers: { 'X-CHALLENGER': token, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        data: { title: "На удаление", doneStatus: false, description: "test" }
    });
    const createdTodo = await response.json();

    // 3. Удаляем её
    response = await request.delete(`${urlApi}/api/todos/${createdTodo.id}`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(204);

    // 4. Проверяем, что её больше нет (404)
    response = await request.get(`${urlApi}/api/todos/${createdTodo.id}`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(404);
});
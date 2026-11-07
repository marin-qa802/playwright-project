import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';
const token = 'c3baa54a-7e9c-4b27-b992-69d757cf5b46'; // Ваш токен

test('Задание 41: Удаление задачи', async ({ request }) => {
  // 1. Создаем задачу
    let response = await request.post(`${urlApi}/api/todos`, {
        headers: { 'X-CHALLENGER': token, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        data: { title: "На удаление", doneStatus: false, description: "test" }
    });
    const createdTodo = await response.json();

    // 2. Удаляем её
    response = await request.delete(`${urlApi}/api/todos/${createdTodo.id}`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(204);

    // 3. Проверяем, что её больше нет (404)
    response = await request.get(`${urlApi}/api/todos/${createdTodo.id}`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(404);
});
import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';
const token = 'c3baa54a-7e9c-4b27-b992-69d757cf5b46'; // Ваш токен

test('Задание 05: Получение конкретной задачи по ID', async ({ request }) => {
   // Сначала создадим задачу, чтобы знать её ID
    let response = await request.post(`${urlApi}/api/todos`, {
        headers: { 'X-CHALLENGER': token, 'Content-Type': 'application/json', 'Accept': 'application/json' },
        data: { title: "Для поиска", doneStatus: false, description: "test" }
    });
    const createdTodo = await response.json();

    // Теперь ищем её по ID
    response = await request.get(`${urlApi}/api/todos/${createdTodo.id}`, {
        headers: { 'X-CHALLENGER': token, 'Accept': 'application/json' }
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.todos[0].id).toBe(createdTodo.id); // Сервер возвращает массив todos
});
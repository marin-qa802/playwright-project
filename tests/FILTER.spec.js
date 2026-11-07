// Проверка фильтрации ?doneStatus=true
import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';
const token = 'c3baa54a-7e9c-4b27-b992-69d757cf5b46'; // ВАШ ТОКЕН ИЗ БРАУЗЕРА

test('Задание 7: Фильтр по doneStatus=true', async ({ request }) => {
    // Отправляем GET запрос с query-параметром
    const response = await request.get(`${urlApi}/api/todos?doneStatus=true`, {
        headers: { 
            'X-CHALLENGER': token, 
            'Accept': 'application/json' 
        }
    });

    // Проверяем, что запрос успешен
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    
    // Проверяем, что все задачи в ответе действительно выполнены (doneStatus = true)
    body.todos.forEach(todo => {
        expect(todo.doneStatus).toBe(true);
    });
});
import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';

test('Создание задачи и проверка в списке', async ({ request }) => {
    // 1. Получаем токен (создаем сессию)
    let response = await request.post(`${urlApi}/api/challenger`, {
        headers: {
            'Accept': 'application/json'
        }
    });
    
    // Проверяем, что сессия создалась успешно
    expect(response.status()).toBe(201);
    
    // Извлекаем токен из заголовков ответа
    const headers = response.headers();
    const token = headers['x-challenger'];
    expect(token).toBeDefined();

    // 2. Создаем задачу, используя полученный токен
    const newTodo = {
        title: "A title",
        doneStatus: false,
        description: "my description"
    };

    response = await request.post(`${urlApi}/api/todos`, {
        headers: {
            'X-CHALLENGER': token, // Теперь токен определен
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: newTodo
    });
    
    expect(response.status()).toBe(201);
    const createdTodo = await response.json();
    
    // Проверяем, что API вернуло созданный объект с ID
    expect(createdTodo.title).toBe(newTodo.title);
    expect(createdTodo.id).toBeDefined();

    // 3. Получаем список задач и ищем нашу задачу
    response = await request.get(`${urlApi}/api/todos`, {
        headers: { 
            'X-CHALLENGER': token, 
            'Accept': 'application/json' 
        }
    });
    
    const body = await response.json();
    const foundTodo = body.todos.find(t => t.id === createdTodo.id);
    
    expect(foundTodo).toBeDefined();
    expect(foundTodo.title).toBe(newTodo.title);
});
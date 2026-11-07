// Проверка создания задачи (успешное и с ошибкой 422) + проверка, что задача создалась (через GET по ID). (2 passed)
import { test, expect } from '../src/fixtures.js'; // Путь может отличаться, проверьте свой
const urlApi = 'https://apichallenges.com'; // <--- ДОБАВЬТЕ ЭТО

let token;
test.beforeEach(async ({ request }) => {
    // 1. Создаем сессию и получаем токен
    const response = await request.post(`${urlApi}/api/challenger`, {
        headers: { 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(201);
    
    // Извлекаем токен из заголовков
    token = response.headers()['x-challenger'];
    expect(token).toBeDefined();
});

test('Успешное создание задачи и проверка в списке', async ({ request }) => {
    const newTodo = {
        title: "Новая задача",
        doneStatus: false,
        description: "Описание задачи"
    };

    // 2. Создаем задачу
    let response = await request.post(`${urlApi}/api/todos`, {
        headers: {
            'X-CHALLENGER': token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: newTodo
    });

    // Проверяем ответ
    expect(response.status()).toBe(201);
    const createdTodo = await response.json();
    
    expect(createdTodo.title).toBe(newTodo.title);
    expect(createdTodo.doneStatus).toBe(newTodo.doneStatus);
    expect(createdTodo.id).toBeDefined();

        // 3. Получаем конкретную задачу по ID (надежнее, чем искать в списке)
    response = await request.get(`${urlApi}/api/todos/${createdTodo.id}`, {
        headers: { 
            'X-CHALLENGER': token, 
            'Accept': 'application/json' 
        }
    });
    
    expect(response.status()).toBe(200); // Сервер должен найти задачу по ID
    
        const responseBody = await response.json();
    
    // Сервер возвращает объект с массивом todos, даже при поиске по ID.
    // Достаем первый элемент из этого массива.
    const foundTodo = responseBody.todos[0]; 

    // Теперь проверяем поля
    expect(foundTodo.id).toBe(createdTodo.id);
    expect(foundTodo.title).toBe(newTodo.title);
});

test('Ошибка 422 при создании задачи с неверным типом doneStatus', async ({ request }) => {
    const invalidTodo = {
        title: "Ошибка",
        doneStatus: "not-a-boolean", // Должно быть boolean
        description: "test"
    };

    const response = await request.post(`${urlApi}/api/todos`, {
        headers: { 
            'X-CHALLENGER': token, 
            'Content-Type': 'application/json', 
            'Accept': 'application/json' 
        },
        data: invalidTodo
    });

    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body.errorMessages).toContain("Failed Validation: doneStatus should be BOOLEAN but was STRING");
});
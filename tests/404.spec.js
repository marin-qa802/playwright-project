// Проверка, что эндпоинт /api/todo (без 's') возвращает 404. 
import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';
const token = 'c3baa54a-7e9c-4b27-b992-69d757cf5b46'; // Ваш токен из браузера

test('Задание 4: GET /api/todo (404) not plural', async ({ request }) => {
// ... дальше ваш код без изменений    // Обращаемся к несуществующему эндпоинту (без 's')
    const response = await request.get(`${urlApi}/api/todo`, {
        headers: { 
            'X-CHALLENGER': token, 
            'Accept': 'application/json' 
        }
    });

    // Ожидаем ошибку 404
    expect(response.status()).toBe(404);
});
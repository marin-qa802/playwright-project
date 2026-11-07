// Проверка получения списка челленджей (Задание 02).
import { test, expect } from '../src/fixtures.js';

const urlApi = 'https://apichallenges.com';

test('Задание 02: Получение списка челленджей', async ({ request }) => {
    // 1. Получаем сессию (токен)
    let response = await request.post(`${urlApi}/api/challenger`, {
        headers: { 'Accept': 'application/json' }
    });
    expect(response.status()).toBe(201);
    const token = response.headers()['x-challenger'];

    // 2. Отправляем GET-запрос на /api/challenges
    response = await request.get(`${urlApi}/api/challenges`, {
        headers: {
            'X-CHALLENGER': token,
            'Accept': 'application/json'
        }
    });

    // 3. Проверяем, что сервер ответил 200 OK
    expect(response.status()).toBe(200);
    
    // (Необязательно) Можно проверить, что в ответе есть массив challenges
    const body = await response.json();
    expect(body.challenges).toBeInstanceOf(Array);
});
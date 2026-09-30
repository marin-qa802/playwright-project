import { test, expect } from "@playwright/test";
let token;
const url = 'https://apichallenges.eviltester.com/';
test.describe('Challenge', () => {
    test.beforeEach(async ({ request }) => {
        let r = await request.post(`${url}challenger`);
        token = r.headers();
      // для дебага
      //  console.log(`${url}gui/challenges/${token['x-challenger']}`);

       // Демо
        r =  await request.get(`${url}todos`, {
            headers:{
    'X-CHALLENGER': token['x-challenger']
            }
        });
        const body = await r.json();

        //todo Данную проверку вынести в тест и посмотреть конструкцию every
body.todos.forEach( item => {
expect(item).toEqual(expect.objectContaining({ id: expect.any(Number)}));
})
      });
    test("Получить список челленджей", async ({ request }) => {
    // 1. Делаем первый запрос к challenges
    let r = await request.get(`${url}challenges`, {
      headers: {
        'X-CHALLENGER': token['x-challenger']
      }
    });

    // Сохраняем тело первого ответа (тут лежат челленджи)
    const bodyChallenges = await r.json();

        // 2. Делаем второй запрос к todos (убрали r = )
    await request.get(`${url}todos`, {
      headers: {
        'X-CHALLENGER': token['x-challenger']
      }
    });

    // Исправлено: проверяем длину массива challenges из правильного объекта
    // Исправлено: тест не упадет при изменении количества данных на сервере
    expect(bodyChallenges.challenges.length).toBeGreaterThan(0);
  });


});
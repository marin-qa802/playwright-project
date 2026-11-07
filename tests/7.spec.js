import { test, expect } from '../src/fixtures.js';
//todo вынести url
const urlApi = 'https://apichallenges.com';
 test('Пользователь может зарегистрироваться используя email и пароль ', async ({ request }) => {
    let response = await request.post(`${urlApi}/api/challenger`);
    const headers = response.headers();
    const token = headers['x-challenger'];

    response = await request.get(`${urlApi}/api/challenges`,{
        headers: {
            'x-challenger': token
        }
    });
    let body = await response.json();   
    expect(body.challenges.length).toEqual(99);
    response = await request.post(`${urlApi}/api/todos`,{
        headers: {
            'x-challenger': token
        },
        data: {
             "title": "A title", // faker
            "doneStatus": false,
            "description": "my description"
        }
    });
     body = await response.json();
     //todo
         expect(body.title).toEqual('A title');

    console.log(`${urlApi}/gui/challenges/${headers['x-challenger']}`);





});
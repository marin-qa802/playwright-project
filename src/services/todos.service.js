import {test} from "@playwright/test";
const urlApi = 'https://apichallenges.com';

export class TodosService {
        constructor(request) {
            this.request = request;
        }
        async post (token, data) {
               return test.step(`POST /api/todos`, async () => {
                    let response = await this.request.post(`${urlApi}/api/todos`,{
                        headers: {
                            'x-challenger': token
                        },
                        data
                    });
             

            const headers = response.headers();
            const body = await response.json();
            const status = response.status();

            return { body, headers, status };

                });
        }
}
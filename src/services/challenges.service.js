import {test} from "@playwright/test";
const urlApi = 'https://apichallenges.com';

export class ChallengesService {
        constructor(request) {
            this.request = request;
        }
        async get (token) {
               return test.step(`GET /api/challenges`, async () => {
                    let response = await this.request.get(`${urlApi}/api/challenges`,{
                        headers: {
                            'x-challenger': token
                        }
                    });
             

            const headers = response.headers();
            const body = await response.json();
            const status = response.status();

            return { body, headers, status };

                });
        }
}
import {test} from "@playwright/test";

// todo
const urlApi = 'https://apichallenges.com';

export class ChallengerService {
        constructor(request) {
            this.request = request;
        }
        async post () {
               return test.step(`POST /api/challenger`, async () => {
                    let response = await this.request.post(`${urlApi}/api/challenger`);
                    const headers = response.headers();
                    const token = headers['x-challenger'];
                    //todo возвращать по стандарту body header status
                    return token;
                 });
        }
}





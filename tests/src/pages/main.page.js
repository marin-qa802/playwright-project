const URL = 'https://realworld.qa.guru/';

export class MainPage {
constructor (page) {    
// техническое описание страницы браузером
// описываем браузер
    this.page = page;
    this.signupLink = page.getByRole('link', { name: 'Sign up' });
}

// методы бизнесовое описание страницы
    async open() {
         await this.page.goto(URL);
    }

     async signup() {
           await this.signupLink.click();
    }
}
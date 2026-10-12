export class RegisterPage {
constructor (page) {    
// техническое описание страницы браузером
// описываем браузер
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
}

// методы бизнесовое описание страницы
    async register(user) {
        await this.nameInput.click();
        await this.nameInput.fill(user.name);
        await this.emailInput.click();
        await this.emailInput.fill(user.email);
        await this.passwordInput.click();
        await this.passwordInput.fill(user.password);
        await this.signupButton.click();
    }
     async signup() {
           await this.signupLink.click();
    }
}
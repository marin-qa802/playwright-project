export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signupButton = page.getByRole('button', { name: 'Sign up' });
  }

  async register(user) {
    await this.nameInput.fill(user.name);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.signupButton.click();
    // Ждем, пока прогрузится главная после регистрации
    await this.page.waitForURL('https://realworld.qa.guru/#/');
  }
}
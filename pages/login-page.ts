import { type Locator, type Page, expect } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly title: RegExp;
    readonly usernameError: RegExp;
    readonly passwordError: RegExp;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;



    constructor(page: Page) {
        this.page = page;
        this.title = /Swag Labs/
        this.usernameError = /Username is required/;
        this.passwordError = /Password is required/;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password'); 
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('h3[data-test="error"]');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.title);
    }

    async assertUsernameError() {
        await expect(this.errorMessage).toHaveText(this.usernameError);
    }

    async assertPasswordError() {
        await expect(this.errorMessage).toHaveText(this.passwordError);
    }
        
}

export default LoginPage;
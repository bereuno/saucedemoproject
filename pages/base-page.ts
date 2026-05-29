import { type Locator, type Page, expect } from "@playwright/test";

export class BasePage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly signIn: Locator;

    constructor(page:Page){
        this.page = page;
        this.usernameField = page.getByRole('textbox', { name: 'Username' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.signIn = page.getByRole('button');
    }

    async loginUser (username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.signIn.click();
    }
}

export default BasePage;
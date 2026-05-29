import { type Locator, type Page, expect } from "@playwright/test";

export class CartPage{
    readonly page: Page;
    readonly blackBackpackAdded: Locator;
    readonly blackShirtAdded: Locator;
    readonly cartSection: Locator;
    readonly continueShopping: Locator;
    readonly jacketAdded: Locator;

    constructor(page: Page){
        this.page = page;
        this.blackBackpackAdded = page.locator('#remove-sauce-labs-backpack');
        this.blackShirtAdded = page.locator('#remove-sauce-labs-bolt-t-shirt');
        this.cartSection = page.getByText('2', { exact: true });
        this.continueShopping = page.getByRole('button', { name: 'Continue Shopping' });
        this.jacketAdded = page.locator('#remove-sauce-labs-fleece-jacket');
    }

    async assertProductsAdded() {
        await expect(this.blackBackpackAdded).toBeVisible();
        await expect(this.blackShirtAdded).toBeVisible();
        
    }
     async goToCart() {
        await this.cartSection.click();
     }

     async GoToContinueShopping() {
        await this.continueShopping.click();
     }

     async assertJacketAdded() {
        await expect(this.jacketAdded).toBeVisible();
     }

     async removeBackpackProduct() {
        await this.blackBackpackAdded.click()
     }

     async assertBackpackRemoved() {
        await expect(this.blackBackpackAdded).not.toBeVisible()
     }
}

export default CartPage;
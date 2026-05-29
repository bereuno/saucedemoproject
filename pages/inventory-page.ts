import { type Locator, type Page, expect } from "@playwright/test";

export class InventoryPage{
    readonly swagLabsTitle: Locator;
    readonly blackBackpack: Locator;
    readonly blackShirt: Locator;
    readonly jacket: Locator;
    
    
    constructor(page:Page){
        this.swagLabsTitle = page.locator('[data-test="shopping-cart-link"]');
        this.blackBackpack = page.locator('#add-to-cart-sauce-labs-backpack');
        this.blackShirt = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
        this.jacket = page.locator('#add-to-cart-sauce-labs-fleece-jacket');
        
    }

    async assertLoginUser(){
        await expect(this.swagLabsTitle).toBeVisible();
        
    }

    async addingArticles() {
        await this.blackBackpack.click();
        await this.blackShirt.click();
    }

    async addThirdArticle() {
        await this.jacket.click();
    }
}

export default InventoryPage;
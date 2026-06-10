import test, {Locator, Page, expect} from "@playwright/test"
import {BasePage} from "../../pages/base-page"
import {InventoryPage} from "../../pages/inventory-page"
import {CartPage} from "../../pages/cart-page"
import {CheckoutPage} from "../../pages/checkout-page"

const url = 'https://www.saucedemo.com/'
let basePage: BasePage;
let inventoryPage: InventoryPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

test.beforeEach(async ({page}) => {
    basePage = new BasePage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto(url)
    await basePage.loginUser('standard_user', 'secret_sauce');

    await inventoryPage.assertLoginUser();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

})

test.describe('User completes a purchase in sauce demo', ()=>{

    test('Add articles to the cart', async ({page}) => {
        await inventoryPage.addingArticles();

        await cartPage.assertProductsAdded();
    })

    test('Update articles in the cart', async ({page}) => {
        await inventoryPage.addingArticles();
        await cartPage.goToCart();
        await cartPage.GoToContinueShopping();
        await inventoryPage.addThirdArticle()

        await cartPage.assertJacketAdded();

    })

    test('Remove article from the cart ', async ({page}) => {
        await inventoryPage.addingArticles();
        await cartPage.goToCart();
        await cartPage.removeBackpackProduct();

        await cartPage.assertBackpackRemoved();
        
    })

    test('Validate check out overview', async ({page}) => {
        await inventoryPage.addingArticles();
        await cartPage.goToCart();
        await checkoutPage.fillOutAddressInfo('Berenice', 'Villa', '58200');

        await checkoutPage.assertOverviewInformation();

    })

    test('Complete purchase and validate end info', async ({page}) => {
        await inventoryPage.addingArticles();
        await cartPage.goToCart();
        await checkoutPage.fillOutAddressInfo('Berenice', 'Villa', '58200');
        await checkoutPage.completePurchase();
        
        await checkoutPage.assertPurchaseDone();
        
    })
})
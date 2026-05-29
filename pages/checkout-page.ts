import { type Locator, type Page, expect } from "@playwright/test";

export class CheckoutPage{
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly zipcodeField: Locator;
    readonly continueButton: Locator;
    readonly orderNumber: Locator;
    readonly shippingType: Locator;
    readonly totalAmount: Locator;
    readonly finishButton: Locator;
    readonly thanksMessage: Locator;
    readonly orderMessage: Locator;

    constructor(page:Page){
        this.page = page;
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameField = page.getByRole('textbox', { name: 'Last Name' });
        this.zipcodeField = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueButton = page.locator('#continue');
        this.orderNumber = page.getByText('SauceCard #31337', { exact: true });
        this.shippingType = page.getByText('Free Pony Express Delivery!', { exact: true });
        this.totalAmount = page.getByText('Total: $49.66', { exact: true });
        this.finishButton = page.getByRole('button', { name: 'Finish' });
        this.thanksMessage = page.getByRole('heading', { name: 'Thank you for your order!' });
        this.orderMessage = page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!', { exact: true });
    }

    async fillOutAddressInfo(firstName: string, lastName: string, zipcode: string) {
        await this.checkoutButton.click();
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipcodeField.fill(zipcode);
        await this.continueButton.click();
    }

    async assertOverviewInformation() {
        await expect(this.orderNumber).toBeVisible();
        await expect(this.shippingType).toBeVisible();
        await expect(this.totalAmount).toBeVisible();
    }

    async completePurchase() {
        await this.finishButton.click();
    }

    async assertPurchaseDone() {
        await expect(this.thanksMessage).toBeVisible();
        await expect(this.orderMessage).toBeVisible();
    }
}

export default CheckoutPage;
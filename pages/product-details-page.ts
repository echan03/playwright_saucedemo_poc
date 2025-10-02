import { type Locator, type Page, expect } from "@playwright/test";

export class ProductDetailsPage {
    readonly page: Page;
    readonly productName: Locator;
    readonly productDesc: Locator;
    readonly productPrice: Locator;
    readonly productImage: Locator;
    readonly addToCartButton: Locator;
    readonly backButton: Locator;
    readonly pageTitle: Locator;
    readonly title: RegExp;
    readonly url: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.title = /Swag Labs/;
        this.url = /inventory-item.html/;
        this.productName = page.locator('.inventory_details_name');
        this.productDesc = page.locator('.inventory_details_desc');
        this.productPrice = page.locator('.inventory_details_price');
        this.productImage = page.locator('.inventory_details_img');
        this.addToCartButton = page.locator('button[data-test^="add-to-cart"]');
        this.backButton = page.locator('button[data-test="back-to-products"]');
        this.pageTitle = page.locator('span.title');
    }

    async assertProductName(expected: string) {
        await expect(this.productName).toHaveText(expected);
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.title);
    }
}

export default ProductDetailsPage;

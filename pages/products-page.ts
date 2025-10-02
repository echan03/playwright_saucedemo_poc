import { type Locator, type Page, expect } from "@playwright/test";

export class ProductsPage {
    static readonly expectedImages: { [key: string]: RegExp } = {
        "Sauce Labs Backpack": /\/static\/media\/sauce-backpack-1200x1500.*\.jpg$/,
        "Sauce Labs Bike Light": /\/static\/media\/bike-light-1200x1500.*\.jpg$/,
        "Sauce Labs Bolt T-Shirt": /\/static\/media\/bolt-shirt-1200x1500.*\.jpg$/,
        "Sauce Labs Fleece Jacket": /\/static\/media\/sauce-pullover-1200x1500.*\.jpg$/,
        "Sauce Labs Onesie": /\/static\/media\/red-onesie-1200x1500.*\.jpg$/,
        "Test.allTheThings() T-Shirt (Red)": /\/static\/media\/red-tatt-1200x1500.*\.jpg$/,
    };
    readonly page: Page;
    readonly headerLabel: RegExp;
    readonly productItems: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;
    readonly productImages: Locator;
    readonly addToCartButtons: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly pageTitle: Locator;
    readonly title: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.title = /Swag Labs/;
        this.headerLabel = /Products/;
        this.productItems = page.locator('.inventory_item');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');
        this.productImages = page.locator('.inventory_item_img img');
        this.addToCartButtons = page.locator('.inventory_item button');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('.product_sort_container');
        this.pageTitle = page.locator('span.title');
    }

    async assertPageHeader() {
        await expect(this.page.locator('span.title')).toHaveText(this.headerLabel);
    }

    async getProductCount(): Promise<number> {
        return await this.productItems.count();
    }
}

export default ProductsPage;
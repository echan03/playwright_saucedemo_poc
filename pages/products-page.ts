import { type Locator, type Page, expect } from "@playwright/test";

export class ProductsPage {
    readonly page: Page;
    readonly headerLabel: RegExp;

    constructor(page: Page) {
        this.page = page;
        this.headerLabel = /Products/;
    }

    async assertPageHeader() {
        await expect(this.page.locator('span.title')).toHaveText(this.headerLabel);
    }
}

export default ProductsPage;
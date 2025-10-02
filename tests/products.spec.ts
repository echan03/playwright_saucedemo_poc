import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { ProductDetailsPage } from '../pages/product-details-page';
import { BaseTest } from './base-test';

let loginPage: LoginPage;
let productsPage: ProductsPage;
let productDetailsPage: ProductDetailsPage;

test.beforeEach(async ({ page }) => {
    await page.goto(BaseTest.URL);
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    productDetailsPage = new ProductDetailsPage(page);
    await loginPage.login(BaseTest.STANDARD_USER, BaseTest.STANDARD_PASSWORD);
});

test.describe('Products Page', () => {
    test('should display correct image for each product', async () => {
        const names = await productsPage.productNames.allTextContents();
        const count = await productsPage.productImages.count();
        expect(names.length).toBe(count);

        for (let i = 0; i < count; i++) {
            const name = names[i];
            const img = productsPage.productImages.nth(i);
            const src = await img.getAttribute('src');
            expect(src).toMatch(ProductsPage.expectedImages[name]);
        }
    });
    test('should have loaded images for all products', async () => {
        const count = await productsPage.productImages.count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
            const img = productsPage.productImages.nth(i);
            // Check image is visible
            await expect(img).toBeVisible();
            // Check image is loaded (naturalWidth > 0)
            const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
            expect(naturalWidth).toBeGreaterThan(0);
        }
    });
    test('should display 6 products after login', async () => {
        const productCount = await productsPage.getProductCount();
        expect(productCount).toBe(6);
    });

    test('should display product names and prices', async () => {
        const names = await productsPage.productNames.allTextContents();
        const prices = await productsPage.productPrices.allTextContents();
        expect(names.length).toBeGreaterThan(0);
        expect(prices.length).toBe(names.length);
        for (const name of names) {
            expect(name).not.toBe('');
        }
        for (const price of prices) {
            expect(price).toMatch(/\$/);
        }
    });

    test('should display product images', async () => {
        expect(await productsPage.productImages.count()).toBeGreaterThan(0);
        for (let i = 0; i < await productsPage.productImages.count(); i++) {
            await expect(productsPage.productImages.nth(i)).toBeVisible();
        }
    });

    test('should add and remove product from cart', async () => {
        // Add first product to cart
        const addButton = productsPage.addToCartButtons.first();
        await addButton.click();
        await expect(productsPage.cartBadge).toHaveText('1');

        // Remove from cart
        const removeButton = productsPage.addToCartButtons.first();
        await removeButton.click();
        await expect(productsPage.cartBadge).not.toBeVisible();
    });

    test('should navigate to product details', async ({ page }) => {
        // Click first product name
        const firstProduct = productsPage.productNames.first();
        const productName = await firstProduct.textContent();
        await firstProduct.click();
        // Check product details page
        await expect(page.locator('.inventory_details_name')).toHaveText(productName || '');
        await expect(page).toHaveURL(productDetailsPage.url);
    });

    test('should sort products by name and price', async () => {
        // Sort by Name (A to Z)
        await productsPage.sortDropdown.selectOption('az');
        const namesAZ = await productsPage.productNames.allTextContents();
        expect([...namesAZ].sort()).toEqual(namesAZ);

        // Sort by Name (Z to A)
        await productsPage.sortDropdown.selectOption('za');
        const namesZA = await productsPage.productNames.allTextContents();
        expect([...namesZA].sort().reverse()).toEqual(namesZA);

        // Sort by Price (low to high)
        await productsPage.sortDropdown.selectOption('lohi');
        const pricesLowHigh = (await productsPage.productPrices.allTextContents()).map(p => parseFloat(p.replace('$', '')));
        expect([...pricesLowHigh].sort((a, b) => a - b)).toEqual(pricesLowHigh);

        // Sort by Price (high to low)
        await productsPage.sortDropdown.selectOption('hilo');
        const pricesHighLow = (await productsPage.productPrices.allTextContents()).map(p => parseFloat(p.replace('$', '')));
        expect([...pricesHighLow].sort((a, b) => b - a)).toEqual(pricesHighLow);
    });

    test('should display correct header and page title', async ({ page }) => {
        await expect(productsPage.pageTitle).toHaveText('Products');
        await expect(page).toHaveTitle(productsPage.title);
    });
});

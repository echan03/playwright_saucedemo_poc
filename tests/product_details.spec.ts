import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductsPage } from '../pages/products-page';
import { ProductDetailsPage } from '../pages/product-details-page';
import { BaseTest } from './base-test';

const productNames = Object.keys(ProductsPage.expectedImages);

for (const [, user] of Object.entries(BaseTest.config.users)) {
    test.describe(`Product Details Page for user: ${user.username}`, () => {
        let loginPage: LoginPage;
        let productsPage: ProductsPage;
        let productDetailsPage: ProductDetailsPage;

        test.beforeEach(async ({ page }) => {
            await page.goto(BaseTest.URL);
            loginPage = new LoginPage(page);
            productsPage = new ProductsPage(page);
            productDetailsPage = new ProductDetailsPage(page);
            await loginPage.login(user.username, user.password);
        });

        for (const productName of productNames) {
            test(`should display correct details for ${productName}`, async () => {
                // Find and click the product
                const idx = (await productsPage.productNames.allTextContents()).indexOf(productName);
                expect(idx).toBeGreaterThan(-1);

                // Get price from products page
                const productsPagePrice = await productsPage.productPrices.nth(idx).textContent();

                await productsPage.productNames.nth(idx).click();

                // Assert product name
                await expect(productDetailsPage.productName).toHaveText(productName);
                // Assert product image src
                const imgSrc = await productDetailsPage.productImage.getAttribute('src');
                expect(imgSrc).toMatch(ProductsPage.expectedImages[productName]);
                // Assert product price is visible and matches format
                await expect(productDetailsPage.productPrice).toBeVisible();
                const priceText = await productDetailsPage.productPrice.textContent();
                expect(priceText).toMatch(/\$/);
                // Assert price matches products page
                expect(priceText).toBe(productsPagePrice);
                // Assert product description is visible
                await expect(productDetailsPage.productDesc).toBeVisible();
            });
        }

        test('should add product to cart from details page', async () => {
            // Click first product
            await productsPage.productNames.first().click();
            // Add to cart
            await productDetailsPage.addToCartButton.click();
            // Cart badge should be visible
            await expect(productDetailsPage.cartBadge).toBeVisible();
        });

        test('should display correct page title', async ({ page }) => {
            await productsPage.productNames.first().click();
            await expect(page).toHaveTitle(productDetailsPage.title);
        });

        test('should remove product from cart from details page', async () => {
            // Click first product
            await productsPage.productNames.first().click();
            // Add to cart
            await productDetailsPage.addToCartButton.click();
            // Remove from cart
            await productDetailsPage.removeButton.click();
            // Cart badge should not be visible
            await expect(productDetailsPage.cartBadge).not.toBeVisible();
        });


    });
}

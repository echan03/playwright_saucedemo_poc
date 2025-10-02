import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login-page';
import ProductsPage from '../pages/products-page';

const URL = 'https:/saucedemo.com/';
let loginPage: LoginPage;
let productsPage: ProductsPage;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
});

test('has title', async () => {
  await loginPage.assertPageTitle();
});

test('standard login', async () => {
  await loginPage.login('standard_user', 'secret_sauce');
  await productsPage.assertPageHeader();
});

test('login with no username', async () => {
  await loginPage.login('', 'secret_sauce');
  await loginPage.assertUsernameError();
});

test('login with no password', async () => {
  await loginPage.login('standard_user', '');
  await loginPage.assertPasswordError();
});

# Playwright Saucedemo POC

This project is a Playwright-based end-to-end test automation proof-of-concept for [saucedemo.com](https://www.saucedemo.com/).

## Features
- Page Object Model for maintainable test code
- Parameterized tests for multiple user types (from `test-config.json`)
- Product, login, and product details page coverage
- Image, price, and UI validation
- Cart actions from both products and product details pages
- Configuration-driven test data
- Playwright HTML reporting

## Project Structure
```
├── pages/
│   ├── login-page.ts
│   ├── products-page.ts
│   └── product-details-page.ts
├── tests/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── product_details.spec.ts
│   ├── base-test.ts
│   └── test-config.json
├── playwright.config.ts
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
```sh
npm install
```

### Running Tests
```sh
npx playwright test
```

### Viewing Reports
```sh
npx playwright show-report
```

## Configuration
- User credentials and base URL are managed in `tests/test-config.json`.
- Update this file to add or modify test users.

## Adding Tests
- Create new spec files in the `tests/` folder.
- Use page objects from the `pages/` folder for maintainable selectors and actions.

## Test Coverage Highlights
- **products.spec.ts**: Validates product list, images, sorting, and cart actions for all users.
- **product_details.spec.ts**: Validates product details, price consistency, add/remove cart actions, and page title for all users.

## Useful Commands
- `npx playwright codegen https://www.saucedemo.com/` - Record new tests interactively
- `npx playwright test --headed` - Run tests with browser UI

## License
MIT

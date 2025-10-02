# Playwright Saucedemo POC

This project is a Playwright-based end-to-end test automation proof-of-concept for [saucedemo.com](https://www.saucedemo.com/).

## Features
- Page Object Model for maintainable test code
- Parameterized tests for multiple user types
- Product and login page coverage
- Image and UI validation
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

## Useful Commands
- `npx playwright codegen https://www.saucedemo.com/` - Record new tests interactively
- `npx playwright test --headed` - Run tests with browser UI

## License
MIT

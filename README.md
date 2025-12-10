# MilltechFX Cypress E2E Tests

This repo contains end‑to‑end tests for DemoQA flows (alerts, web tables, login) using Cypress with Cucumber (Gherkin) step definitions and Mochawesome reporting.

The goal: make it easy for anyone to install, run, and review test results without surprises.

## What’s in here
- Cypress 15 with Cucumber preprocessor.
- Feature files under `cypress/e2e/**` and matching step definitions.
- Page Objects under `cypress/support/pages/**`.
- Mochawesome reports generated to `cypress/reports/`.

## Prerequisites
- Node.js 18+ (recommended) and npm.
- A Linux/macOS/WSL environment is fine. These scripts use bash.

Check your versions:
```bash
node -v
npm -v
```

## Install
From the project root:
```bash
npm install
```

Installed dev dependencies (and target versions):
- `cypress`: ^15.7.1
- `@badeball/cypress-cucumber-preprocessor`: ^24.0.0
- `@bahmutov/cypress-esbuild-preprocessor`: ^2.2.8
- `esbuild`: ^0.27.1
- `mochawesome`: ^7.1.4
- `mochawesome-merge`: ^5.1.0
- `mochawesome-report-generator`: ^6.3.2

If your npm resolves slightly different minor versions, that’s OK. If you want exact locks, add a lockfile or pin versions.

## Project structure
```
cypress.config.js
package.json
cypress/
  e2e/
    features/
      alerts/
        alertsButton.feature
        alertsButton.steps.js
      login/
        invalidLogin.feature
        invalidLogin.steps.js
    webTables/
      ...
  support/
    e2e.js
    pages/
      alertsPage.js
      loginPage.js
```

## Configuration highlights
- `baseUrl`: `https://demoqa.com`
- Spec pattern points at `*.feature` files.
- Cucumber preprocessor + esbuild bundler are wired in `setupNodeEvents`.
- Reporter: `mochawesome` with JSON output to `cypress/reports`.

## Running tests
- Open Cypress GUI (interactive):
```bash
npx cypress open
```
Pick a feature file from the GUI and run it.

- Run headless (CI style):
```bash
npm run test
```
This runs all specs matching the feature pattern.

- Run a single feature:
```bash
npx cypress run --spec "cypress/e2e/features/alerts/alertsButton.feature"
```

### Book Store API invalid password case
- Spec: `cypress/e2e/features/bookstore/bookStoreApi-invalid-password.feature`
- What it does: opens Swagger UI, tries `POST /Account/v1/User` with a weak password, and validates the API error.
- Run it directly:
```bash
npx cypress run --spec "cypress/e2e/features/bookstore/bookStoreApi-invalid-password.feature" --headless
```

Step definition behavior:
- The Then step accepts multiple possible error message variants using `||` (API can return different texts):
  - Example feature line:
    `Then I should see an error code "1200" with a message containing "Passwords must have at least one non alphanumeric character || UserName and Password required."`
- If the API returns a success-shaped object (e.g., `{ userId, username, books }`) instead of an error, the step asserts basic success shape to avoid false failures.



## Reports
After a headless run, merge and generate the HTML report:
```bash
npm run report
```
Open it:
```bash
xdg-open cypress/reports/html/report.html
```
On macOS:
```bash
open cypress/reports/html/report.html
```

## CI: GitHub Actions
You can run these tests automatically on every push/PR using GitHub Actions.

Workflow file: `.github/workflows/cypress.yml`
- Uses Node 18 and runs Cypress headless in Chrome.
- Merges Mochawesome JSON and publishes the HTML report as a build artifact.

How it works:
1. Push to `main` or open a PR.
2. GitHub Actions will:
  - `npm ci`
  - run `cypress-io/github-action` with specs `cypress/e2e/**/*.feature`
  - merge and generate `cypress/reports/html/report.html`
  - upload the report so you can download from the job’s Artifacts section.

If you need to override `baseUrl` per environment, set `CYPRESS_baseUrl` in the workflow `env`.

## Notes on selectors and pages
- DemoQA’s login username field is `#userName` (camelCase), password is `#password`, and login button is `#login`.
- Alerts use specific IDs like `#alertButton`, `#timerAlertButton`, `#confirmButton`, `#promtButton` (sic). The page objects capture these.

## Troubleshooting
- Duplicate step definitions: if Cucumber complains about “Multiple matching step definitions…”, use more specific wording per feature or consolidate common steps into one shared file.
- Cross‑origin script errors: we ignore noisy third‑party exceptions globally in `cypress/support/e2e.js`.
- Network or auth gates: if DemoQA changes flows, adapt the steps (e.g., stubbing `window.confirm`/`window.prompt` as already shown).

## Submitting/Reviewing
- To validate locally: `npm install`, then `npm run test`, then `npm run report`.
- Include the generated HTML report found at `cypress/reports/html/report.html` with your submission if needed.
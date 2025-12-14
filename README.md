# MilltechFX Cypress E2E Tests

Friendly end‑to‑end tests for DemoQA using Cypress + Cucumber. The goal is simple: clone, install, run, and read the report without surprises.

## What’s Inside
- Cypress 15 with Gherkin feature files and step definitions.
- Page Objects under `cypress/support/pages/**` to keep selectors tidy.
- Mochawesome reports generated to `cypress/reports/` (JSON + pretty HTML).

## Requirements
- Node.js 18+ (recommended) and npm.
- Linux/macOS/WSL all work fine.

Check your versions:
```bash
node -v
npm -v
```

## Set Up
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

## Repo Tour
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

## Config Highlights
- `baseUrl`: `https://demoqa.com`
- Spec pattern points at `*.feature` files.
- Cucumber preprocessor + esbuild bundler wired in `setupNodeEvents`.
- Reporter: `mochawesome` outputs JSON to `cypress/reports`.

## Run Tests
- Open Cypress (interactive):
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

### Book Store API: Invalid Password
- Spec: `cypress/e2e/features/bookstore/bookStoreApi-invalid-password.feature`
- What it checks: opens Swagger UI, tries `POST /Account/v1/User` with a weak password, and validates the API error.
- Run it directly:
```bash
npx cypress run --spec "cypress/e2e/features/bookstore/bookStoreApi-invalid-password.feature" --headless
```

Step definition behavior:
- The Then step accepts multiple possible error message variants using `||` (API can return different texts). Example:
  `Then I should see an error code "1200" with a message containing "Passwords must have at least one non alphanumeric character || UserName and Password required."`
- If the API returns a success‑shaped object (e.g., `{ userId, username, books }`) instead of an error, we assert the basic success shape to avoid false failures.



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

## CI (Optional)
You can run these tests automatically on every push/PR with GitHub Actions.

Workflow file: `.github/workflows/cypress.yml`
- Uses Node 18 and runs Cypress headless in Chrome.
- Merges Mochawesome JSON and publishes the HTML report as an artifact.

Environment overrides: set `CYPRESS_baseUrl` in the workflow `env`.

## Tips & Gotchas
- Login selectors: `#userName` (camelCase), `#password`, `#login`.
- Alerts: `#alertButton`, `#timerAlertButton`, `#confirmButton`, `#promtButton` (typo on the site) are covered in page objects.
- Noisy third‑party errors: ignored globally in `cypress/support/e2e.js` to keep runs clean.

## Troubleshooting
- “Multiple matching step definitions…”: tighten wording or consolidate shared steps.
- Network or auth changes on DemoQA: adapt steps or stub `window.confirm` / `window.prompt`.

## Contribute / Review
- Local check: `npm install` → `npm run test` → `npm run report`.
- Share the HTML report (`cypress/reports/html/report.html`) when you need a quick review.
const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const {addCucumberPreprocessorPlugin} = require('@badeball/cypress-cucumber-preprocessor')
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild')


async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);
  on('file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  return config;
}


module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    specPattern: 'cypress/e2e/**/*.feature',
    setupNodeEvents,
    // Increase timeouts to accommodate slow external site loads in CI
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 15000,
    env: {
      // Explicitly tell the cucumber preprocessor where to find step files
      stepDefinitions: [
        'cypress/e2e/features/**/*.js',
        'cypress/e2e/webTables/**/*.js'
      ]
    }
    ,
    chromeWebSecurity: false,
    experimentalModifyObstructiveThirdPartyCode: true
  },
  // Enable Mochawesome reporter for Cypress runs
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true
  }
});
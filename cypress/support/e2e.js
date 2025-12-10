// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
// Ignore cross-origin script errors from the AUT (DemoQA loads 3rd-party scripts)
Cypress.on('uncaught:exception', (err) => {
	// Return false to prevent Cypress from failing the test
	// Useful for noisy third-party script errors that are outside test control
	return false;
});
// Ensure Cucumber step support is loaded before specs (optional for sidecar, safe to include)
// Removed deprecated subpath import; the plugin initializes step API via bundler.
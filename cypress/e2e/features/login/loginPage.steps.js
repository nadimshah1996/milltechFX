import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../../support/pages/loginPage';

Given('I am on the login page', () => {
	cy.visit('/login');
});

When('I fill username {string} and password {string}', (username, password) => {
	loginPage.getUsernameInput().clear().type(username);
	loginPage.getPasswordInput().clear().type(password);
});

When('I click the login button', () => {
	loginPage.getLoginButton().click();
});

Then('I should be redirected to {string}', (path) => {
	cy.location('pathname').should('eq', path);
});

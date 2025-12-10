import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../../support/pages/loginPage';

Given('I am on the DemoQA login page', () => {
  cy.visit('/login');
});

When('I enter invalid username {string} and password {string}', (username, password) => {
  loginPage.getUsernameInput().clear().type(username);
  loginPage.getPasswordInput().clear().type(password);
});

When('I submit the invalid login', () => {
  loginPage.getLoginButton().click();
});

Then('I should see the error message {string} in red', (message) => {
  cy.get('#name')
    .should('be.visible')
    .and('have.text', message)
    .and('have.css', 'color', 'rgb(255, 0, 0)');
});
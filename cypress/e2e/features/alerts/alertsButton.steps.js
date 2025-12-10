import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import alertsPage from '../../../support/pages/alertsPage';

Given('I am on the Alerts page', () => {
	cy.visit('/');
    cy.get('.card').contains('Alerts, Frame & Windows').click();
    cy.get('.element-list').contains('Alerts').click();
    cy.visit('/alerts');
});


When('I click the alert button', () => {
	alertsPage.clickAlertButton().click();
});

Then('I should see an alert with message {string}', (expectedMessage) => {
	
	cy.on('window:alert', (msg) => {
		expect(msg).to.eq(expectedMessage);
	});
});


When('I click the delayed alert button', () => {
	alertsPage.clickOnbutton().click();
});


When('I click the confirm button and choose {string}', (choice) => {
	cy.window().then((win) => {
		const response = choice.toLowerCase() === 'ok';
		cy.stub(win, 'confirm').callsFake((message) => {
			return response;
		});
	});

	alertsPage.confirmButton().click();
});

Then('I should see a confirm with message {string}', (expectedMessage) => {
	cy.on('window:confirm', (msg) => {
		expect(msg).to.eq(expectedMessage);
	});
});

Then('the confirm result text should be {string}', (expectedText) => {
	cy.get('#confirmResult').should('have.text', expectedText);
});


When('I click the prompt button and enter a random name', () => {
	const randomName = `user${Math.floor(Math.random() * 10000)}`;

	cy.window().then((win) => {
		cy.stub(win, 'prompt').returns(randomName);
	});

	alertsPage.promptButton().click();

	cy.wrap(randomName).as('enteredName');
});

Then('the prompt result text should start with {string}', (prefix) => {
	cy.get('@enteredName').then((name) => {
		const expected = `${prefix}${name}`;
		cy.get('#promptResult').should('have.text', expected);
	});
});
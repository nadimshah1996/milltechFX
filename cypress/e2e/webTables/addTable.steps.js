const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { webTables, navigation } = require('../../support/pages/webTables');

Given('I am on the Web Tables page', () => {
	cy.visit('/');
	navigation.getElementsCard().should('be.visible').click();
	navigation.getWebTablesMenuItem().should('be.visible').click();
	cy.url().should('include', '/webtables');
});

When('I click the Add button', () => {
	webTables.getAddButton().scrollIntoView().should('be.visible').click({ force: true });
	webTables.getModal().should('be.visible');
});

When(
	'I fill the modal form with First Name {string}, Last Name {string}, Email {string}, Age {string}, Salary {string} and Department {string}',
	(firstName, lastName, email, age, salary, department) => {
		const typeIfNotEmpty = (getFn, value) => {
			if (value && value.length > 0) {
				getFn().clear().type(value);
			} else {
				getFn().clear();
			}
		};

		typeIfNotEmpty(webTables.getFirstNameInput, firstName);
		typeIfNotEmpty(webTables.getLastNameInput, lastName);
		typeIfNotEmpty(webTables.getEmailInput, email);
		typeIfNotEmpty(webTables.getAgeInput, age);
		typeIfNotEmpty(webTables.getSalaryInput, salary);
		typeIfNotEmpty(webTables.getDepartmentInput, department);
	}
);

When('I submit the record form', () => {
	webTables.getSubmitButton().should('be.visible').click();
});

Then(
	'I should see a row with First Name {string}, Last Name {string}, Email {string}, Age {string}, Salary {string} and Department {string}',
	(firstName, lastName, email, age, salary, department) => {

		webTables
			.getTableRows()
			.should('exist')
			.contains(email)
			.parents('.rt-tr-group')
			.find('.rt-tr .rt-td')
			.then(($cells) => {
				expect($cells.eq(0)).to.contain.text(firstName);
				expect($cells.eq(1)).to.contain.text(lastName);
				expect($cells.eq(2)).to.contain.text(age);
				expect($cells.eq(3)).to.contain.text(email);
				expect($cells.eq(4)).to.contain.text(salary);
				expect($cells.eq(5)).to.contain.text(department);
			});
	}
);

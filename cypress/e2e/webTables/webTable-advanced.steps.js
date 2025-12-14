const { When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { webTables } = require('../../support/pages/webTables');

Then('I should not see a row containing email {string}', (email) => {
  cy.get('.rt-table .rt-tbody .rt-tr-group').contains(email).should('not.exist');
});

Then('I should see at least {int} rows containing email {string}', (count, email) => {
  let found = 0;
  webTables.getTableRows().each(($row) => {
    const hasEmail = $row.text().includes(email);
    if (hasEmail) found++;
  }).then(() => {
    expect(found).to.be.at.least(count);
  });
});

When('I edit the row with email {string} to First Name {string}, Last Name {string}, Age {string}, Salary {string} and Department {string}',
  (email, firstName, lastName, age, salary, department) => {
    webTables.findRowByEmail(email).then(($row) => {
      webTables.getEditButtonInRow($row).scrollIntoView().click({ force: true });
    });
    webTables.getModal().should('be.visible');
    webTables.getFirstNameInput().should('be.visible').clear().type(firstName);
    webTables.getLastNameInput().clear().type(lastName);
    webTables.getEmailInput().clear().type(email);
    webTables.getAgeInput().clear().type(age);
    webTables.getSalaryInput().clear().type(salary);
    webTables.getDepartmentInput().clear().type(department);
    webTables.getSubmitButton().click();
});

When('I delete the row with email {string}', (email) => {
  webTables.findRowByEmail(email).then(($row) => {
    webTables.getDeleteButtonInRow($row).click();
  });
});

When('I close the modal without submitting', () => {
  webTables.getCloseModalButton().should('be.visible').click();
  webTables.getModal().should('not.exist');
});

When('I close the modal window', () => {
  webTables.getCloseModalButton().should('be.visible').click();
  webTables.getModal().should('not.exist');
});
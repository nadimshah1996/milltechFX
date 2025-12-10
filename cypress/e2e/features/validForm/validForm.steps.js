const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { formPage } = require('../../../support/pages/formPage');

Given('I open the practice form page', () => {
  cy.visit('/');
  formPage.getFormsCard().click();
  cy.url().should('include', '/forms');
  cy.contains('Practice Form').click();
  cy.url().should('include', '/automation-practice-form');
});

When('I fill in the form with:', (dataTable) => {
  const data = dataTable.rowsHash();
  if (data.firstName) formPage.getInputFirstName().clear().type(data.firstName);
  if (data.lastName) formPage.getInputLastName().clear().type(data.lastName);
  if (data.email) formPage.getInputEmail().clear().type(data.email);
  if (data.mobile) {
    formPage.getInputMobile().clear().type(data.mobile, { delay: 50 }).then($el => {
      const val = $el.val();
      if (val !== data.mobile) {
        cy.wrap($el).invoke('val', data.mobile).trigger('input').trigger('change').should('have.value', data.mobile);
      } else {
        cy.wrap($el).should('have.value', data.mobile);
      }
    });
  }

  if (data.gender) {
    const genderValue = data.gender;
    formPage.selectGender(genderValue);
    Cypress.env('addedGender', genderValue);
  } else {
    formPage.selectRandomGender().then((g) => {
      Cypress.env('addedGender', g);
    });
  }

  if (data.hobby) {
    const normalized = (data.hobby || '').toString().trim().toLowerCase();
    const mapping = { sports: '1', reading: '2', music: '3' };
    const idx = mapping[normalized];
    if (!idx) {
      throw new Error(`Unknown hobby '${data.hobby}'. Expected Sports, Reading, or Music.`);
    }
    formPage.getHobbyCheckbox(idx).scrollIntoView({ block: 'center' }).should('exist').check().should('be.checked');
    const labels = { 1: 'Sports', 2: 'Reading', 3: 'Music' };
    Cypress.env('addedHobby', labels[idx]);
  } else {
    formPage.selectRandomHobby().then((h) => {
      Cypress.env('addedHobby', h);
    });
  }

  const randomAddress = `Test Address ${Math.floor(Math.random() * 1000000)}`;
  cy.get('#currentAddress')
    .scrollIntoView({ block: 'center' })
    .should('be.visible')
    .then($el => {
      $el[0].focus();
      cy.wrap($el).clear().type(randomAddress);
    });
  Cypress.env('addedAddress', randomAddress);

  formPage.getSubmitButton().click();
  formPage.getSubmissionModal().should('be.visible');

  const addedSubject = Cypress.env('addedSubject');
  if (addedSubject) {
    formPage.getSubmissionModal().should('contain', addedSubject);
  }
});

When('I submit the form', () => {
  formPage.getSubmitButton()
    .scrollIntoView({ block: 'center' })
    .should('be.visible')
    .click({ force: true });
  formPage.getSubmissionModal().should('be.visible');
});

Then('I should see the submission modal containing {string} and {string} and {string}', (name, email, mobile) => {
  formPage.getSubmissionModal().should('be.visible');
  formPage.getSubmissionModal().find('.table-responsive').within(() => {
    cy.contains('td', 'Student Name', { timeout: 10000 }).parents('tr').find('td').eq(1).invoke('text').then((t) => {
      const actual = t.replace(/\s+/g, ' ').trim();
      expect(actual).to.contain(name);
    });

    cy.contains('td', 'Student Email', { timeout: 10000 }).parents('tr').find('td').eq(1).invoke('text').then((t) => {
      const actual = t.replace(/\s+/g, '').trim();
      const expected = email.replace(/\s+/g, '').trim();
      expect(actual).to.contain(expected);
    });

    cy.contains('td', 'Mobile', { timeout: 10000 }).parents('tr').find('td').eq(1).invoke('text').then((t) => {
      const actual = t.replace(/\s+/g, '').trim();
      const expected = mobile.replace(/\s+/g, '').trim();
      expect(actual).to.contain(expected);
    });

    const addedGender = Cypress.env('addedGender');
    if (addedGender) {
      cy.contains('td', 'Gender', { timeout: 10000 }).parents('tr').find('td').eq(1).should('contain', addedGender);
    }

    const addedHobby = Cypress.env('addedHobby');
    if (addedHobby) {
      cy.contains('td', 'Hobbies', { timeout: 10000 }).parents('tr').find('td').eq(1).should('contain', addedHobby);
    }

    const addedAddress = Cypress.env('addedAddress');
    if (addedAddress) {
      cy.get('td').then(($tds) => {
        let found = false;
        $tds.each((i, el) => {
          const txt = (el.innerText || '').trim();
          if (txt === 'Address' || txt === 'Current Address') {
            const $tr = Cypress.$(el).closest('tr');
            const val = $tr.find('td').eq(1).text().trim();
            expect(val).to.contain(addedAddress);
            found = true;
            return false;
          }
        });
        if (!found) {
          throw new Error('Address row not found in submission modal table');
        }
      });
    }
  });
  formPage.getCloseModalButton().click();
});
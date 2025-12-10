const formPage = {

  getFormsCard: () => cy.get('.category-cards').contains('div.card', 'Forms'),
  getInputFirstName: () => cy.get('#firstName'),
  getInputLastName: () => cy.get('#lastName'),
  getInputEmail: () => cy.get('#userEmail'),
  getInputMobile: () => cy.get('#userNumber'),
  getDateOfBirthInput: () => cy.get('#dateOfBirth'),
  getHobbyCheckbox: (idx) => cy.get(`#hobbies-checkbox-${idx}`),
  getHobbyLabel: (idx) => cy.get(`label[for="hobbies-checkbox-${idx}"]`),
  getCurrentAddress: () => cy.get('#currentAddress'),
  getSubmitButton: () => cy.get('#submit'),
  getSubmissionModal: () => cy.get('.modal-content'),
  getCloseModalButton: () => cy.get('#closeLargeModal'),
  getTabledata: () => cy.get('.table-responsive')
  ,

  selectRandomGender: () => {
    const idx = 1; // Male
    const mapping = { 1: 'Male', 2: 'Female', 3: 'Other' };
    const inputSel = `#gender-radio-${idx}`;
   
    cy.get(inputSel).scrollIntoView().should('exist').check({ force: true }).should('be.checked');
    return cy.wrap(mapping[idx]);
  },

  selectGender: (name) => {
    const normalized = (name || '').toString().trim().toLowerCase();
    const mapping = { male: '1', female: '2', other: '3' };
    const idx = mapping[normalized];
    if (!idx) {
      throw new Error(`selectGender: unknown gender '${name}'. Expected Male, Female or Other.`);
    }
    const inputSel = `#gender-radio-${idx}`;
    const labels = { 1: 'Male', 2: 'Female', 3: 'Other' };
    
    cy.get(inputSel).scrollIntoView().should('exist').check({ force: true }).should('be.checked');
    return cy.wrap(labels[idx]);
  }
  ,
  
  addUniqueCurrentAddress: () => {
    
    const randomAddress = `Test Address ${Math.floor(Math.random() * 1000000)}`;
    cy.get('#currentAddress')
      .scrollIntoView({ block: 'center' })
      .should('be.visible')
      .clear()
      .type(randomAddress);
    return cy.wrap(randomAddress);
  }
  ,
  selectRandomHobby: () => {
    const idx = Math.floor(Math.random() * 3) + 1;
    const mapping = { 1: 'Sports', 2: 'Reading', 3: 'Music' };
    const sel = `#hobbies-checkbox-${idx}`;
    cy.get(sel).scrollIntoView({ block: 'center' }).should('exist').check({ force: true }).should('be.checked');
    return cy.wrap(mapping[idx]);
  }
};

const practiceMenu = {
  getPracticeFormMenuItem: () => cy.get('#item-0')
};

module.exports = { formPage, practiceMenu };
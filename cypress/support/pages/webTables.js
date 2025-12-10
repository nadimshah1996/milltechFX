const webTables = {
    getAddButton: () => cy.get('#addNewRecordButton'),
    getModal: () => cy.get('.modal-content'),
    getFirstNameInput: () => cy.get('#firstName'),
    getLastNameInput: () => cy.get('#lastName'),
    getEmailInput: () => cy.get('#userEmail'),
    getAgeInput: () => cy.get('#age'),
    getSalaryInput: () => cy.get('#salary'),
    getDepartmentInput: () => cy.get('#department'),
    getSubmitButton: () => cy.get('#submit'),
    getTableRows: () => cy.get('.rt-table .rt-tbody .rt-tr-group'),
        getCloseModalButton: () => cy.get('.modal-content .close, #closeLargeModal').first(),
    findRowByEmail: (email) =>
        cy.get('.rt-table .rt-tbody .rt-tr-group')
          .contains(email)
          .parents('.rt-tr-group'),
    getCloseModalWindow : () => cy.get('.close'),
    getRowCells: ($row) => cy.wrap($row).find('.rt-tr .rt-td'),
    getEditButtonInRow: ($row) => cy.wrap($row).find('span[title="Edit"]'),
    getDeleteButtonInRow: ($row) => cy.wrap($row).find('span[title="Delete"]'),
};

const navigation = {
    getElementsCard: () => cy.get('.category-cards').contains('div.card', 'Elements'),
    getWebTablesMenuItem: () => cy.get('#item-3').contains('Web Tables'),
};
module.exports = { webTables, navigation };

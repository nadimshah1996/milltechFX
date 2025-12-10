const alertsPage = {
    clickAlertButton: () => cy.get('#alertButton'),
    clickOnbutton: () => cy.get('#timerAlertButton'),
    confirmButton: () => cy.get('#confirmButton'),
    promptButton: () => cy.get('#promtButton'),
};

export default alertsPage;
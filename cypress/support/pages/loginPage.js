const loginPage = {
    getUsernameInput: () => cy.get('#userName'),
    getPasswordInput: () => cy.get('#password'),
    getLoginButton: () => cy.get('#login')
};

export default loginPage;
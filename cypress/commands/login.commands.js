const { LOGIN_SELECTORS } = require('../selectors/login.selectors');

Cypress.Commands.add('visitLogin', () => {
  cy.visit('/login');
});

Cypress.Commands.add('loginViaUI', (email, password) => {
  cy.get(LOGIN_SELECTORS.emailInput).clear().type(email);
  cy.get(LOGIN_SELECTORS.passwordInput).clear().type(password);
  cy.get(LOGIN_SELECTORS.submitButton).click();
});

Cypress.Commands.add('getLoginErrorAlert', () => {
  return cy.get(LOGIN_SELECTORS.errorAlert);
});

Cypress.Commands.add('getLogoutButton', () => {
  return cy.get(LOGIN_SELECTORS.logoutButton);
});

const { CADASTRO_SELECTORS } = require('../selectors/cadastro.selectors');

Cypress.Commands.add('visitCadastro', () => {
  cy.visit('/cadastrarusuarios');
});

Cypress.Commands.add('fillCadastroNome', (nome) => {
  cy.get(CADASTRO_SELECTORS.nomeInput).clear().type(nome);
});

Cypress.Commands.add('fillCadastroEmail', (email) => {
  cy.get(CADASTRO_SELECTORS.emailInput).clear().type(email);
});

Cypress.Commands.add('fillCadastroPassword', (password) => {
  cy.get(CADASTRO_SELECTORS.passwordInput).clear().type(password);
});

Cypress.Commands.add('fillCadastroForm', ({ nome, email, password }) => {
  cy.fillCadastroNome(nome);
  cy.fillCadastroEmail(email);
  cy.fillCadastroPassword(password);
});

Cypress.Commands.add('submitCadastro', () => {
  cy.get(CADASTRO_SELECTORS.submitButton).click();
});

Cypress.Commands.add('getCadastroAlert', (texto) => {
  return cy.contains(CADASTRO_SELECTORS.errorAlert, texto);
});

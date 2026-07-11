const { CADASTRO_SELECTORS } = require('../selectors/cadastro.selectors');

class CadastroPage {
  visit() {
    cy.visit('/cadastrarusuarios');
  }

  fillNome(nome) {
    cy.get(CADASTRO_SELECTORS.nomeInput).clear().type(nome);
  }

  fillEmail(email) {
    cy.get(CADASTRO_SELECTORS.emailInput).clear().type(email);
  }

  fillPassword(password) {
    cy.get(CADASTRO_SELECTORS.passwordInput).clear().type(password);
  }

  submit() {
    cy.get(CADASTRO_SELECTORS.submitButton).click();
  }

  fillForm({ nome, email, password }) {
    this.fillNome(nome);
    this.fillEmail(email);
    this.fillPassword(password);
  }

  getNomeError() {
    return cy.get(CADASTRO_SELECTORS.nomeError);
  }

  getEmailError() {
    return cy.get(CADASTRO_SELECTORS.emailError);
  }

  getPasswordError() {
    return cy.get(CADASTRO_SELECTORS.passwordError);
  }

  getAlertEmailExistente() {
    return cy.get(CADASTRO_SELECTORS.alertEmailExistente);
  }
}

module.exports = new CadastroPage();

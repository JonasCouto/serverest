const { LOGIN_SELECTORS } = require('../selectors/login.selectors');

class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    cy.get(LOGIN_SELECTORS.emailInput).clear().type(email);
  }

  fillPassword(password) {
    cy.get(LOGIN_SELECTORS.passwordInput).clear().type(password);
  }

  submit() {
    cy.get(LOGIN_SELECTORS.submitButton).click();
  }

  clickRegisterLink() {
    cy.get(LOGIN_SELECTORS.registerLink).click();
  }

  getErrorMessage() {
    return cy.get(LOGIN_SELECTORS.errorMessage);
  }

  getEmailError() {
    return cy.get(LOGIN_SELECTORS.emailError);
  }

  getPasswordError() {
    return cy.get(LOGIN_SELECTORS.passwordError);
  }

  getWelcomeText() {
    return cy.get(LOGIN_SELECTORS.welcomeText);
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
}

module.exports = new LoginPage();

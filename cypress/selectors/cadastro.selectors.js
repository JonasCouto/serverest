const CADASTRO_SELECTORS = {
  nomeInput: '[data-testid="nome"]',
  emailInput: '[data-testid="email"]',
  passwordInput: '[data-testid="password"]',
  adminCheckbox: '[data-testid="administrador"]',
  submitButton: '[data-testid="cadastrar"]',
  nomeError: '[data-testid="error-nome"]',
  emailError: '[data-testid="error-email"]',
  passwordError: '[data-testid="error-password"]',
  alertEmailExistente: 'span.invalid-feedback',
};

module.exports = { CADASTRO_SELECTORS };

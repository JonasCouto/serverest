const LOGIN_SELECTORS = {
  emailInput: '[data-testid="email"]',
  passwordInput: '[data-testid="senha"]',
  submitButton: '[data-testid="entrar"]',
  registerLink: '[data-testid="cadastrar"]',
  // ErrorAlert não possui data-testid — renderiza .alert.alert-secondary > span
  errorAlert: '.alert.alert-secondary',
  // Após login, o navbar (cliente e admin) exibe o botão logout
  logoutButton: '[data-testid="logout"]',
};

module.exports = { LOGIN_SELECTORS };


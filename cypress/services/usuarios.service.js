const API_URL = Cypress.env('apiUrl') || 'https://serverest.dev';

const UsuariosService = {
  cadastrar(payload) {
    return cy.request({
      method: 'POST',
      url: `${API_URL}/usuarios`,
      body: payload,
      failOnStatusCode: false,
    });
  },

  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${API_URL}/login`,
      body: { email, password },
      failOnStatusCode: false,
    });
  },
};

module.exports = { UsuariosService };

const API_URL = Cypress.env('apiUrl') || 'https://serverest.dev';

const UsuariosService = {
  listar(queryParams = {}) {
    return cy.request({
      method: 'GET',
      url: `${API_URL}/usuarios`,
      qs: queryParams,
      failOnStatusCode: false,
    });
  },

  buscarPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${API_URL}/usuarios/${id}`,
      failOnStatusCode: false,
    });
  },

  cadastrar(payload) {
    return cy.request({
      method: 'POST',
      url: `${API_URL}/usuarios`,
      body: payload,
      failOnStatusCode: false,
    });
  },

  editar(id, payload, token) {
    return cy.request({
      method: 'PUT',
      url: `${API_URL}/usuarios/${id}`,
      body: payload,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },

  deletar(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${API_URL}/usuarios/${id}`,
      headers: { Authorization: token },
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

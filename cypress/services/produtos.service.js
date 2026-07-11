const API_URL = Cypress.env('apiUrl') || 'https://serverest.dev';

const ProdutosService = {
  listar(queryParams = {}) {
    return cy.request({
      method: 'GET',
      url: `${API_URL}/produtos`,
      qs: queryParams,
      failOnStatusCode: false,
    });
  },

  buscarPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${API_URL}/produtos/${id}`,
      failOnStatusCode: false,
    });
  },

  cadastrar(payload, token) {
    const headers = token ? { Authorization: token } : {};
    return cy.request({
      method: 'POST',
      url: `${API_URL}/produtos`,
      body: payload,
      headers,
      failOnStatusCode: false,
    });
  },

  editar(id, payload, token) {
    return cy.request({
      method: 'PUT',
      url: `${API_URL}/produtos/${id}`,
      body: payload,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },

  deletar(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${API_URL}/produtos/${id}`,
      headers: { Authorization: token },
      failOnStatusCode: false,
    });
  },
};

module.exports = { ProdutosService };

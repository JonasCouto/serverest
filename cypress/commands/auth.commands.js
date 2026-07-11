/**
 * Realiza login via API e salva o token no localStorage,
 * evitando a necessidade de passar pela UI a cada teste.
 */
Cypress.Commands.add('loginViaApi', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl') || 'https://serverest.dev'}/login`,
    body: { email, password },
    failOnStatusCode: false,
  }).then((response) => {
    expect(response.status).to.eq(200);
    window.localStorage.setItem('serverest/userEmail', email);
    window.localStorage.setItem('serverest/userToken', response.body.authorization);
  });
});

/**
 * Cadastra um usuário via API e retorna o ID gerado.
 */
Cypress.Commands.add('cadastrarUsuario', (usuario) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl') || 'https://serverest.dev'}/usuarios`,
    body: usuario,
    failOnStatusCode: false,
  });
});

/**
 * Remove um usuário via API pelo seu ID.
 */
Cypress.Commands.add('deletarUsuario', (id, token) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiUrl') || 'https://serverest.dev'}/usuarios/${id}`,
    headers: { Authorization: token },
    failOnStatusCode: false,
  });
});

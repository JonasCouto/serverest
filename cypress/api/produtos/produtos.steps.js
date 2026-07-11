const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { ProdutosService } = require('../../services/produtos.service');
const { UsuariosService } = require('../../services/usuarios.service');
const { ProdutoBuilder } = require('../../builders/produto.builder');
const { UsuarioBuilder } = require('../../builders/usuario.builder');

let response;
let produtoCriado;
let adminToken;
let novoProduto;

// ─── Helper: cria admin e obtém token ─────────────────────────────────────────

function loginComoAdmin() {
  const admin = new UsuarioBuilder().comoAdministrador().build();
  return UsuariosService.cadastrar(admin).then(() => {
    return UsuariosService.login(admin.email, admin.password).then((res) => {
      expect(res.status).to.eq(200);
      adminToken = res.body.authorization;
    });
  });
}

// ─── Contexto ────────────────────────────────────────────────────────────────

Given('que a API está disponível em {string}', (url) => {
  cy.request({ method: 'GET', url, failOnStatusCode: false }).then((res) => {
    expect(res.status).to.be.lessThan(500);
  });
});

// ─── Setup ────────────────────────────────────────────────────────────────────

Given('que possuo um token de administrador válido', () => {
  loginComoAdmin();
});

Given('que tenho os dados de um novo produto válido', () => {
  novoProduto = new ProdutoBuilder().build();
});

Given('que existe um produto cadastrado na API', () => {
  loginComoAdmin().then(() => {
    const produto = new ProdutoBuilder().build();
    ProdutosService.cadastrar(produto, adminToken).then((res) => {
      expect(res.status).to.eq(201);
      produtoCriado = { ...produto, _id: res.body._id };
    });
  });
});

// ─── Ações ────────────────────────────────────────────────────────────────────

When('envio uma requisição GET para {string}', (endpoint) => {
  if (endpoint === '/produtos') {
    response = ProdutosService.listar();
  }
});

When('cadastro o produto com autenticação', () => {
  response = ProdutosService.cadastrar(novoProduto, adminToken);
});

When('cadastro o produto sem autenticação', () => {
  response = ProdutosService.cadastrar(novoProduto, null);
});

When('busco o produto pelo seu ID', () => {
  response = ProdutosService.buscarPorId(produtoCriado._id);
});

When('edito o produto com novos dados', () => {
  const dadosAtualizados = new ProdutoBuilder().build();
  response = ProdutosService.editar(produtoCriado._id, dadosAtualizados, adminToken);
});

// ─── Assertivas ───────────────────────────────────────────────────────────────

Then('o status da resposta deve ser {int}', (statusCode) => {
  response.then((res) => {
    expect(res.status).to.eq(statusCode);
  });
});

Then('o corpo deve conter a mensagem {string}', (mensagem) => {
  response.then((res) => {
    expect(res.body.message).to.eq(mensagem);
  });
});

Then('o corpo deve conter o campo {string}', (campo) => {
  response.then((res) => {
    expect(res.body).to.have.property(campo);
  });
});

Then('o campo {string} deve ser maior ou igual a {int}', (campo, valor) => {
  response.then((res) => {
    expect(res.body[campo]).to.be.gte(valor);
  });
});

Then('o corpo deve conter os campos {string}, {string}, {string}', (c1, c2, c3) => {
  response.then((res) => {
    expect(res.body).to.have.property(c1);
    expect(res.body).to.have.property(c2);
    expect(res.body).to.have.property(c3);
  });
});

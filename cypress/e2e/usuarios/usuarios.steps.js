const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const loginPage = require('../../pages/login.page');
const cadastroPage = require('../../pages/cadastro.page');
const { UsuariosService } = require('../../services/usuarios.service');
const { UsuarioBuilder } = require('../../builders/usuario.builder');

let usuarioAtivo;

// ─── Setup ────────────────────────────────────────────────────────────────────

Given('que estou na página de login', () => {
  loginPage.visit();
});

Given('que estou na página de cadastro de usuário', () => {
  cadastroPage.visit();
});

Given('que tenho um usuário administrador cadastrado via API', () => {
  usuarioAtivo = new UsuarioBuilder().comoAdministrador().build();
  UsuariosService.cadastrar(usuarioAtivo).then((res) => {
    expect(res.status).to.eq(201);
  });
});

Given('que tenho dados de um novo usuário gerado dinamicamente', () => {
  usuarioAtivo = new UsuarioBuilder().build();
});

Given('que já existe um usuário cadastrado via API', () => {
  usuarioAtivo = new UsuarioBuilder().build();
  UsuariosService.cadastrar(usuarioAtivo).then((res) => {
    expect(res.status).to.eq(201);
  });
});

// ─── Ações de Login ───────────────────────────────────────────────────────────

When('preencho o e-mail com o email do usuário cadastrado', () => {
  loginPage.fillEmail(usuarioAtivo.email);
});

When('preencho a senha com a senha do usuário cadastrado', () => {
  loginPage.fillPassword(usuarioAtivo.password);
});

When('preencho o e-mail com {string}', (email) => {
  loginPage.fillEmail(email);
});

When('preencho a senha com {string}', (password) => {
  loginPage.fillPassword(password);
});

When('clico no botão de entrar', () => {
  loginPage.submit();
});

// ─── Ações de Cadastro ────────────────────────────────────────────────────────

When('preencho o formulário com os dados do novo usuário', () => {
  cadastroPage.fillForm(usuarioAtivo);
});

When('preencho o formulário com o e-mail do usuário já cadastrado', () => {
  const novoUsuario = new UsuarioBuilder().comEmail(usuarioAtivo.email).build();
  cadastroPage.fillForm(novoUsuario);
});

When('clico no botão de cadastrar', () => {
  cadastroPage.submit();
});

When('clico no botão de cadastrar sem preencher nenhum campo', () => {
  cadastroPage.submit();
});

// ─── Assertivas ───────────────────────────────────────────────────────────────

Then('devo ser redirecionado para a página inicial', () => {
  cy.url().should('include', '/home');
});

Then('devo ver a mensagem de boas-vindas', () => {
  loginPage.getWelcomeText().should('be.visible');
});

Then('devo ver a mensagem de erro de credenciais inválidas', () => {
  loginPage
    .getErrorMessage()
    .should('be.visible')
    .and('contain.text', 'Email e/ou senha inválidos');
});

Then('devo ser redirecionado para a página de login', () => {
  cy.url().should('include', '/login');
});

Then('devo ver a mensagem de e-mail já cadastrado', () => {
  cadastroPage
    .getAlertEmailExistente()
    .should('be.visible')
    .and('contain.text', 'Este email já está sendo usado');
});

Then('devo ver a mensagem de campo nome obrigatório', () => {
  cadastroPage
    .getNomeError()
    .should('be.visible')
    .and('contain.text', 'Nome é obrigatório');
});

Then('devo ver a mensagem de campo e-mail obrigatório no cadastro', () => {
  cadastroPage
    .getEmailError()
    .should('be.visible')
    .and('contain.text', 'Email é obrigatório');
});

Then('devo ver a mensagem de campo senha obrigatório no cadastro', () => {
  cadastroPage
    .getPasswordError()
    .should('be.visible')
    .and('contain.text', 'Password é obrigatório');
});

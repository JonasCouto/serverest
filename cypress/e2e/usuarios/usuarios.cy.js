const { UsuariosService } = require('../../services/usuarios.service');
const { UsuarioBuilder } = require('../../builders/usuario.builder');

describe('Gestão de Usuários — Frontend ServeRest', { tags: ['@e2e', '@usuarios'] }, () => {
  // ─── Login ──────────────────────────────────────────────────────────────────

  context('Login', () => {
    it('com credenciais válidas deve redirecionar para a página inicial', { tags: ['@smoke', '@login'] }, () => {
      const usuario = new UsuarioBuilder().comoAdministrador().build();

      UsuariosService.cadastrar(usuario).then((res) => {
        expect(res.status).to.eq(201);
      });

      cy.visitLogin();
      cy.loginViaUI(usuario.email, usuario.password);
      cy.url({ timeout: 15000 }).should('include', '/home');
      cy.url().should('not.include', '/login');
      cy.title().should('not.be.empty');
      cy.getLogoutButton().should('be.visible');
    });

    it('com credenciais inválidas deve exibir mensagem de erro', { tags: ['@negativo', '@login'] }, () => {
      cy.visitLogin();
      cy.loginViaUI('usuario@invalido.com', 'senhaErrada123');
      cy.url().should('include', '/login');
      cy.getLoginErrorAlert().should('be.visible');
      cy.getLoginErrorAlert().should('contain.text', 'Email e/ou senha inválidos');
    });
  });

  // ─── Cadastro ───────────────────────────────────────────────────────────────

  context('Cadastro', () => {
    it('novo usuário com sucesso deve redirecionar para a página inicial', { tags: ['@smoke', '@cadastro'] }, () => {
      const usuario = new UsuarioBuilder().build();

      cy.visitCadastro();
      cy.fillCadastroForm(usuario);
      cy.submitCadastro();
      cy.url({ timeout: 15000 }).should('include', '/home');
      cy.url().should('not.include', '/cadastrarusuarios');
      cy.getLogoutButton().should('be.visible');
    });

    it('com e-mail já existente deve exibir mensagem de erro', { tags: ['@negativo', '@cadastro'] }, () => {
      const usuario = new UsuarioBuilder().build();

      UsuariosService.cadastrar(usuario).then((res) => {
        expect(res.status).to.eq(201);
      });

      const novoUsuario = new UsuarioBuilder().comEmail(usuario.email).build();

      cy.visitCadastro();
      cy.fillCadastroForm(novoUsuario);
      cy.submitCadastro();
      cy.url().should('include', '/cadastrarusuarios');
      cy.getCadastroAlert('Este email já está sendo usado').should('be.visible');
    });

    it('campos obrigatórios devem ser validados ao submeter formulário vazio', { tags: ['@negativo', '@validacao'] }, () => {
      cy.visitCadastro();
      cy.submitCadastro();
      cy.url().should('include', '/cadastrarusuarios');
      cy.get('.alert.alert-secondary').should('have.length', 3);
      cy.getCadastroAlert('Nome é obrigatório').should('be.visible');
      cy.getCadastroAlert('Email é obrigatório').should('be.visible');
      cy.getCadastroAlert('Password é obrigatório').should('be.visible');
    });
  });
});

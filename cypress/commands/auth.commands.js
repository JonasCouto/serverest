const { UsuariosService } = require('../services/usuarios.service');
const { UsuarioBuilder } = require('../builders/usuario.builder');

Cypress.Commands.add('criarAdminEObterToken', () => {
  const admin = new UsuarioBuilder().comoAdministrador().build();
  return UsuariosService.cadastrar(admin).then(() =>
    UsuariosService.login(admin.email, admin.password).then((res) => {
      expect(res.status).to.eq(200);
      return res.body.authorization;
    })
  );
});

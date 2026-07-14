const { faker } = require('@faker-js/faker/locale/pt_BR');

class UsuarioBuilder {
  constructor() {
    this.usuario = {
      nome: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 12 }),
      administrador: 'false',
    };
  }

  comEmail(email) {
    this.usuario.email = email;
    return this;
  }

  comoAdministrador() {
    this.usuario.administrador = 'true';
    return this;
  }

  build() {
    return { ...this.usuario };
  }
}

module.exports = { UsuarioBuilder };

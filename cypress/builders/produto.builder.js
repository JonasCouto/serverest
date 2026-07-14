const { faker } = require('@faker-js/faker/locale/pt_BR');

class ProdutoBuilder {
  constructor() {
    this.produto = {
      nome: `${faker.commerce.productName()} ${faker.string.alphanumeric(8)}`,
      preco: faker.number.int({ min: 10, max: 999 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 100 }),
    };
  }

  comNome(nome) {
    this.produto.nome = nome;
    return this;
  }

  comPreco(preco) {
    this.produto.preco = preco;
    return this;
  }

  comDescricao(descricao) {
    this.produto.descricao = descricao;
    return this;
  }

  comQuantidade(quantidade) {
    this.produto.quantidade = quantidade;
    return this;
  }

  build() {
    return { ...this.produto };
  }
}

module.exports = { ProdutoBuilder };

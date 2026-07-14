const { ProdutosService } = require('../../services/produtos.service');
const { ProdutoBuilder } = require('../../builders/produto.builder');

describe('Gerenciamento de Produtos — API ServeRest', { tags: ['@api', '@produtos'] }, () => {

  context('Leitura', () => {
    it('listar produtos cadastrados deve retornar status 200', { tags: ['@smoke', '@listagem'] }, () => {
      ProdutosService.listar().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.headers['content-type']).to.include('application/json');
        expect(res.body).to.have.property('produtos');
        expect(res.body.produtos).to.be.an('array');
        expect(res.body).to.have.property('quantidade');
        expect(res.body.quantidade).to.be.gte(0);
        expect(res.body.quantidade).to.eq(res.body.produtos.length);
      });
    });

    it('buscar produto por ID deve retornar os dados do produto', { tags: ['@smoke', '@busca-produto'] }, () => {
      const produto = new ProdutoBuilder().build();

      cy.criarAdminEObterToken().then((token) => {
        ProdutosService.cadastrar(produto, token).then((resCadastro) => {
          expect(resCadastro.status).to.eq(201);

          const id = resCadastro.body._id;

          ProdutosService.buscarPorId(id).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body._id).to.eq(id);
            expect(res.body.nome).to.eq(produto.nome);
            expect(res.body.preco).to.eq(produto.preco);
            expect(res.body.descricao).to.eq(produto.descricao);
            expect(res.body.quantidade).to.eq(produto.quantidade);
          });
        });
      });
    });
  });

  context('Escrita', () => {
    it('cadastrar produto como administrador deve retornar status 201', { tags: ['@smoke', '@cadastro-produto'] }, () => {
      const produto = new ProdutoBuilder().build();

      cy.criarAdminEObterToken().then((token) => {
        ProdutosService.cadastrar(produto, token).then((res) => {
          expect(res.status).to.eq(201);
          expect(res.body.message).to.eq('Cadastro realizado com sucesso');
          expect(res.body).to.have.property('_id');
          expect(res.body._id).to.be.a('string').and.not.be.empty;

          ProdutosService.buscarPorId(res.body._id).then((resBusca) => {
            expect(resBusca.status).to.eq(200);
            expect(resBusca.body.nome).to.eq(produto.nome);
            expect(resBusca.body.preco).to.eq(produto.preco);
          });
        });
      });
    });

    it('editar produto cadastrado deve retornar mensagem de sucesso', { tags: ['@smoke', '@edicao'] }, () => {
      const produto = new ProdutoBuilder().build();
      const dadosAtualizados = new ProdutoBuilder().build();

      cy.criarAdminEObterToken().then((token) => {
        ProdutosService.cadastrar(produto, token).then((resCadastro) => {
          expect(resCadastro.status).to.eq(201);

          const id = resCadastro.body._id;

          ProdutosService.editar(id, dadosAtualizados, token).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq('Registro alterado com sucesso');

            ProdutosService.buscarPorId(id).then((resBusca) => {
              expect(resBusca.body.nome).to.eq(dadosAtualizados.nome);
              expect(resBusca.body.preco).to.eq(dadosAtualizados.preco);
            });
          });
        });
      });
    });

    it('deletar produto cadastrado deve retornar sucesso e produto não deve mais existir', { tags: ['@smoke', '@exclusao'] }, () => {
      const produto = new ProdutoBuilder().build();

      cy.criarAdminEObterToken().then((token) => {
        ProdutosService.cadastrar(produto, token).then((resCadastro) => {
          expect(resCadastro.status).to.eq(201);
          const id = resCadastro.body._id;

          ProdutosService.deletar(id, token).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.message).to.eq('Registro excluído com sucesso');

            ProdutosService.buscarPorId(id).then((resBusca) => {
              expect(resBusca.status).to.eq(400);
              expect(resBusca.body.message).to.eq('Produto não encontrado');
            });
          });
        });
      });
    });
  });

  context('Segurança', () => {
    it('cadastrar produto sem token deve retornar status 401', { tags: ['@negativo', '@autenticacao'] }, () => {
      const produto = new ProdutoBuilder().build();

      ProdutosService.cadastrar(produto, null).then((res) => {
        expect(res.status).to.eq(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.eq(
          'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais'
        );
      });
    });
  });
});

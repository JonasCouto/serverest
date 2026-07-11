# language: pt

@api @produtos
Funcionalidade: Gerenciamento de Produtos — API ServeRest

  Como administrador da loja ServeRest
  Quero gerenciar produtos via endpoints REST
  Para garantir o correto funcionamento do catálogo de produtos

  Contexto:
    Dado que a API está disponível em "https://serverest.dev"

  @smoke @listagem
  Cenário: Listar produtos cadastrados com sucesso
    Quando envio uma requisição GET para "/produtos"
    Então o status da resposta deve ser 200
    E o corpo deve conter o campo "produtos"
    E o campo "quantidade" deve ser maior ou igual a 0

  @smoke @cadastro-produto
  Cenário: Cadastrar produto como administrador com sucesso
    Dado que possuo um token de administrador válido
    E que tenho os dados de um novo produto válido
    Quando cadastro o produto com autenticação
    Então o status da resposta deve ser 201
    E o corpo deve conter a mensagem "Cadastro realizado com sucesso"
    E o corpo deve conter o campo "_id"

  @smoke @busca-produto
  Cenário: Buscar produto por ID com sucesso
    Dado que existe um produto cadastrado na API
    Quando busco o produto pelo seu ID
    Então o status da resposta deve ser 200
    E o corpo deve conter os campos "nome", "preco", "descricao"

  @smoke @edicao
  Cenário: Editar produto cadastrado com sucesso
    Dado que existe um produto cadastrado na API
    Quando edito o produto com novos dados
    Então o status da resposta deve ser 200
    E o corpo deve conter a mensagem "Registro alterado com sucesso"

  @negativo @autenticacao
  Cenário: Não deve cadastrar produto sem token de autenticação
    Dado que tenho os dados de um novo produto válido
    Quando cadastro o produto sem autenticação
    Então o status da resposta deve ser 401
    E o corpo deve conter a mensagem "Token de acesso ausente, inválido, expirado ou usuário do token não existe mais"

# language: pt

@e2e @usuarios
Funcionalidade: Gestão de Usuários — Frontend ServeRest

  Como visitante da loja ServeRest
  Quero realizar login e cadastro no frontend
  Para acessar as funcionalidades da plataforma

  @smoke @login @fluxo-feliz
  Cenário: Login com credenciais válidas deve redirecionar para a página inicial
    Dado que estou na página de login
    E que tenho um usuário administrador cadastrado via API
    Quando preencho o e-mail com o email do usuário cadastrado
    E preencho a senha com a senha do usuário cadastrado
    E clico no botão de entrar
    Então devo ser redirecionado para a página inicial
    E devo ver a mensagem de boas-vindas

  @negativo @login
  Cenário: Login com credenciais inválidas deve exibir mensagem de erro
    Dado que estou na página de login
    Quando preencho o e-mail com "usuario@invalido.com"
    E preencho a senha com "senhaErrada123"
    E clico no botão de entrar
    Então devo ver a mensagem de erro de credenciais inválidas

  @smoke @cadastro @fluxo-feliz
  Cenário: Cadastrar novo usuário com sucesso deve redirecionar para a página inicial
    Dado que estou na página de cadastro de usuário
    E que tenho dados de um novo usuário gerado dinamicamente
    Quando preencho o formulário com os dados do novo usuário
    E clico no botão de cadastrar
    Então devo ser redirecionado para a página inicial

  @negativo @cadastro
  Cenário: Tentar cadastrar usuário com e-mail já existente deve exibir erro
    Dado que estou na página de cadastro de usuário
    E que já existe um usuário cadastrado via API
    Quando preencho o formulário com o e-mail do usuário já cadastrado
    E clico no botão de cadastrar
    Então devo ver a mensagem de e-mail já cadastrado

  @negativo @validacao
  Cenário: Campos obrigatórios no formulário de cadastro devem ser validados
    Dado que estou na página de cadastro de usuário
    Quando clico no botão de cadastrar sem preencher nenhum campo
    Então devo ver a mensagem de campo nome obrigatório
    E devo ver a mensagem de campo e-mail obrigatório no cadastro
    E devo ver a mensagem de campo senha obrigatório no cadastro

  @smoke @logout
  Cenário: Logout após login deve redirecionar para a página de login
    Dado que estou na página de login
    E que tenho um usuário administrador cadastrado via API
    Quando preencho o e-mail com o email do usuário cadastrado
    E preencho a senha com a senha do usuário cadastrado
    E clico no botão de entrar
    E clico no botão de logout
    Então devo ser redirecionado para a página de login
    E o botão de logout não deve estar visível

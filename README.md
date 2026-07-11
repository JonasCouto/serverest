# ServeRest — Automação de Testes

Projeto de automação de testes E2E e de API para a aplicação **ServeRest**, utilizando **Cypress 14** e **JavaScript**.

## Contexto

Utilizando o framework Cypress e a linguagem JavaScript, são desenvolvidos cenários de testes automatizados para:

- **Frontend (E2E):** https://front.serverest.dev/
- **API (REST):** https://serverest.dev/

### Critérios de qualidade aplicados

- Adoção de boas práticas de desenvolvimento
- Qualidade na construção do código
- Aplicação de padrões de projeto (Custom Commands, Service Layer, Builder Pattern)
- Adequação e clareza das assertivas nos testes
- Qualidade e clareza nos commits

---

## Stack

| Ferramenta | Versão | Finalidade |
|---|---|---|
| [Cypress](https://cypress.io) | 14+ | Framework de testes E2E e API |
| [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | ES2020+ | Linguagem |
| [@faker-js/faker](https://fakerjs.dev/) | 10+ | Geração de dados dinâmicos |
| [@shelex/cypress-allure-plugin](https://github.com/Shelex/cypress-allure-plugin) | 2+ | Relatório Allure |
| [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) | 4+ | Relatório HTML |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | — | Qualidade e formatação de código |

---

## Pré-requisitos

| Requisito | Versão mínima | Link |
|---|---|---|
| **Node.js** | 22 LTS | https://nodejs.org/ |
| **npm** | 10+ | Incluso com Node.js |
| **Git** | — | https://git-scm.com/ |

> **Dica:** Use [nvm](https://github.com/nvm-sh/nvm) (Linux/macOS) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) para gerenciar versões do Node.

---

## Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd serverest

# 2. Instale as dependências
npm install
```

---

## Execução dos Testes

### Interface gráfica (modo interativo)

```bash
# Abre o Cypress com todos os testes disponíveis
npm run cy:open

# Abre filtrado apenas para testes de API
npm run cy:open:api

# Abre filtrado apenas para testes E2E
npm run cy:open:e2e
```

### Headless (modo CI)

```bash
# Roda todos os testes (API + E2E)
npm run cy:run

# Apenas testes de API
npm run test:api

# Apenas testes E2E
npm run test:e2e
```

---

## Relatórios

### Mochawesome (HTML)

Gerado automaticamente após cada execução em `cypress/reports/html/index.html`.

```bash
start cypress/reports/html/index.html   # Windows
open cypress/reports/html/index.html    # macOS
```

### Allure

Requer [Allure CLI](https://docs.qameta.io/allure/#_installing_a_commandline) instalado globalmente.

```bash
# Gerar e abrir relatório Allure
npm run report:allure
```

---

## Qualidade de Código

```bash
# Verificar lint
npm run lint

# Formatar código
npm run format
```

---

## Estrutura do Projeto

```
serverest/
├── cypress/
│   ├── api/
│   │   └── produtos/
│   │       ├── produtos.cy.js       # Testes de API — Produtos
│   │       └── produtos.feature     # Documentação BDD (referência)
│   ├── e2e/
│   │   └── usuarios/
│   │       ├── usuarios.cy.js       # Testes E2E — Usuários
│   │       └── usuarios.feature     # Documentação BDD (referência)
│   ├── commands/
│   │   ├── auth.commands.js         # loginViaApi, cadastrarUsuario, deletarUsuario
│   │   ├── login.commands.js        # visitLogin, loginViaUI, fillLoginEmail, ...
│   │   └── cadastro.commands.js     # visitCadastro, fillCadastroForm, submitCadastro, ...
│   ├── selectors/
│   │   ├── login.selectors.js       # Seletores da tela de login
│   │   └── cadastro.selectors.js    # Seletores da tela de cadastro
│   ├── services/
│   │   ├── usuarios.service.js      # listar, buscarPorId, cadastrar, editar, deletar, login
│   │   └── produtos.service.js      # listar, buscarPorId, cadastrar, editar, deletar
│   ├── builders/
│   │   ├── usuario.builder.js       # Builder com dados dinâmicos de usuário
│   │   └── produto.builder.js       # Builder com dados dinâmicos de produto
│   ├── contracts/
│   │   └── serverest_contrato.json  # Contrato OpenAPI da ServeRest (referência)
│   ├── fixtures/                    # Dados estáticos
│   └── support/
│       ├── e2e.js                   # Entry point do Cypress (imports globais)
│       └── commands.js              # Registro de custom commands
├── cypress.config.js                # Configuração do Cypress
├── eslint.config.js                 # Regras de lint
└── package.json
```

---

## Arquitetura

O projeto adota três padrões principais:

### Custom Commands (`cypress/commands/`)

Encapsulam a interação com a UI, centralizando os seletores e evitando repetição nos testes.

```js
// Nos testes, sem acesso direto a seletores:
cy.visitLogin();
cy.loginViaUI(usuario.email, usuario.password);
cy.getLogoutButton().should('be.visible');
```

### Service Layer (`cypress/services/`)

Centraliza todas as chamadas à API REST, reutilizáveis tanto nos testes de API quanto nos setups dos testes E2E.

```js
UsuariosService.cadastrar(usuario).then((res) => {
  expect(res.status).to.eq(201);
});
```

### Builder Pattern (`cypress/builders/`)

Gera payloads de teste com dados dinâmicos via `@faker-js/faker`, com interface fluente.

```js
const admin = new UsuarioBuilder().comoAdministrador().build();
const produto = new ProdutoBuilder().comPreco(99).build();
```

---

## Cobertura de Testes

### API — Produtos (`cypress/api/produtos/produtos.cy.js`)

| Cenário | Tags |
|---|---|
| Listar produtos retorna status 200 e estrutura válida | `@smoke` `@listagem` |
| Cadastrar produto como administrador retorna 201 e confirma criação | `@smoke` `@cadastro-produto` |
| Buscar produto por ID retorna todos os campos com valores corretos | `@smoke` `@busca-produto` |
| Editar produto e confirmar atualização via GET | `@smoke` `@edicao` |
| Cadastrar sem token retorna 401 | `@negativo` `@autenticacao` |

### E2E — Usuários (`cypress/e2e/usuarios/usuarios.cy.js`)

| Cenário | Tags |
|---|---|
| Login com credenciais válidas redireciona para home | `@smoke` `@login` |
| Login com credenciais inválidas exibe alerta de erro | `@negativo` `@login` |
| Cadastro de novo usuário redireciona para home | `@smoke` `@cadastro` |
| Cadastro com e-mail duplicado exibe mensagem de erro | `@negativo` `@cadastro` |
| Campos obrigatórios exibem 3 alertas de validação | `@negativo` `@validacao` |

---

## Custom Commands disponíveis

### Auth (`auth.commands.js`)

| Command | Descrição |
|---|---|
| `cy.loginViaApi(email, password)` | Autentica via API e salva token no localStorage |
| `cy.cadastrarUsuario(usuario)` | Cadastra usuário via API |
| `cy.deletarUsuario(id, token)` | Remove usuário via API |

### Login (`login.commands.js`)

| Command | Descrição |
|---|---|
| `cy.visitLogin()` | Navega para `/login` |
| `cy.fillLoginEmail(email)` | Preenche campo de e-mail |
| `cy.fillLoginPassword(password)` | Preenche campo de senha |
| `cy.submitLogin()` | Clica no botão entrar |
| `cy.loginViaUI(email, password)` | Preenche e submete o formulário de login |
| `cy.getLoginErrorAlert()` | Retorna o elemento de alerta de erro |
| `cy.getLogoutButton()` | Retorna o botão de logout |

### Cadastro (`cadastro.commands.js`)

| Command | Descrição |
|---|---|
| `cy.visitCadastro()` | Navega para `/cadastrarusuarios` |
| `cy.fillCadastroNome(nome)` | Preenche campo nome |
| `cy.fillCadastroEmail(email)` | Preenche campo e-mail |
| `cy.fillCadastroPassword(password)` | Preenche campo senha |
| `cy.fillCadastroForm({ nome, email, password })` | Preenche todo o formulário |
| `cy.submitCadastro()` | Clica no botão cadastrar |
| `cy.getCadastroAlert(texto)` | Retorna alerta que contém o texto |

---

## Convenções de Código

- **Arquivos:** `kebab-case` — ex: `login.commands.js`, `usuario.builder.js`
- **Funções/variáveis:** `camelCase`
- **Classes:** `PascalCase`
- **Constantes:** `UPPER_CASE`
- **Seletores:** prioridade `data-testid` → `aria-label` → `role` → `id`
- **Esperas:** sempre implícitas via retry do Cypress — **nunca** `cy.wait(número)`

## Convenções de Commit

Seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(login): adiciona cenário de login com credenciais inválidas
fix(api): corrige validação de status na rota POST /produtos
test(cadastro): adiciona assert de quantidade de alertas obrigatórios
refactor(commands): extrai interações de login para login.commands.js
```

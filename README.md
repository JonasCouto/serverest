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
git clone <url-do-repositorio>
cd serverest
npm install
```

---

## Execução dos Testes

### Interface gráfica (modo interativo)

```bash
npm run cy:open         # Todos os testes
npm run cy:open:api     # Apenas API
npm run cy:open:e2e     # Apenas E2E
```

### Headless (modo CI)

```bash
npm run cy:run          # Todos os testes
npm run test:api        # Apenas API
npm run test:e2e        # Apenas E2E
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
npm run report:allure
```

---

## Qualidade de Código

```bash
npm run lint      # Verificar lint
npm run format    # Formatar código
```

---

## Estrutura do Projeto

```
serverest/
├── cypress/
│   ├── api/
│   │   └── produtos/
│   │       ├── produtos.cy.js
│   │       └── produtos.feature
│   ├── e2e/
│   │   └── usuarios/
│   │       ├── usuarios.cy.js
│   │       └── usuarios.feature
│   ├── commands/
│   │   ├── auth.commands.js
│   │   ├── login.commands.js
│   │   └── cadastro.commands.js
│   ├── selectors/
│   │   ├── login.selectors.js
│   │   └── cadastro.selectors.js
│   ├── services/
│   │   ├── usuarios.service.js
│   │   └── produtos.service.js
│   ├── builders/
│   │   ├── usuario.builder.js
│   │   └── produto.builder.js
│   ├── fixtures/
│   └── support/
│       ├── e2e.js
│       └── commands.js
├── cypress.config.js
├── eslint.config.js
└── package.json
```

---

## Arquitetura

O projeto adota três padrões principais:

### Custom Commands (`cypress/commands/`)

Encapsulam interações com a UI e operações reutilizáveis, centralizando seletores e eliminando repetição nos testes.

```js
// Autenticação — obtém token de admin via API
cy.criarAdminEObterToken().then((token) => { ... });

// Interação com UI — sem seletor direto nos testes
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

ProdutosService.deletar(id, token).then((res) => {
  expect(res.status).to.eq(200);
});
```

### Builder Pattern (`cypress/builders/`)

Gera payloads de teste com dados dinâmicos via `@faker-js/faker`, com interface fluente.

```js
const admin = new UsuarioBuilder().comoAdministrador().build();
const produto = new ProdutoBuilder().comPreco(99).comQuantidade(10).build();
```

---

## Cobertura de Testes

### API — Produtos (`cypress/api/produtos/produtos.cy.js`)

**Leitura**

| Cenário | Tags |
|---|---|
| Listar produtos retorna status 200, estrutura e quantidade correta | `@smoke` `@listagem` |
| Buscar produto por ID retorna todos os campos com valores corretos | `@smoke` `@busca-produto` |

**Escrita**

| Cenário | Tags |
|---|---|
| Cadastrar produto como administrador retorna 201 e confirma criação via GET | `@smoke` `@cadastro-produto` |
| Editar produto e confirmar atualização via GET | `@smoke` `@edicao` |
| Deletar produto e confirmar remoção via GET (retorna 400) | `@smoke` `@exclusao` |

**Segurança**

| Cenário | Tags |
|---|---|
| Cadastrar produto sem token retorna 401 com mensagem de erro | `@negativo` `@autenticacao` |

### E2E — Usuários (`cypress/e2e/usuarios/usuarios.cy.js`)

**Login**

| Cenário | Tags |
|---|---|
| Credenciais válidas redirecionam para home e exibem botão de logout | `@smoke` `@login` |
| Credenciais inválidas exibem alerta e permanecem em `/login` | `@negativo` `@login` |

**Cadastro**

| Cenário | Tags |
|---|---|
| Novo usuário com sucesso redireciona para home | `@smoke` `@cadastro` |
| E-mail duplicado exibe alerta e permanece em `/cadastrarusuarios` | `@negativo` `@cadastro` |
| Formulário vazio exibe exatamente 3 alertas de validação | `@negativo` `@validacao` |

**Logout**

| Cenário | Tags |
|---|---|
| Logout após login redireciona para `/login` e remove botão de logout | `@smoke` `@logout` |

---

## Custom Commands disponíveis

### Auth (`auth.commands.js`)

| Command | Descrição |
|---|---|
| `cy.criarAdminEObterToken()` | Cria usuário admin via API, autentica e retorna o token de autorização |

### Login (`login.commands.js`)

| Command | Descrição |
|---|---|
| `cy.visitLogin()` | Navega para `/login` |
| `cy.loginViaUI(email, password)` | Preenche e submete o formulário de login |
| `cy.getLoginErrorAlert()` | Retorna o elemento de alerta de erro de login |
| `cy.getLogoutButton()` | Retorna o botão de logout |

### Cadastro (`cadastro.commands.js`)

| Command | Descrição |
|---|---|
| `cy.visitCadastro()` | Navega para `/cadastrarusuarios` |
| `cy.fillCadastroForm({ nome, email, password })` | Preenche todos os campos do formulário |
| `cy.submitCadastro()` | Clica no botão cadastrar |
| `cy.getCadastroAlert(texto)` | Retorna alerta que contém o texto especificado |
| `cy.getCadastroAlerts()` | Retorna todos os alertas de validação |

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

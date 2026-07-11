# ServeRest — Automação de Testes

Projeto de automação de testes E2E e de API para a aplicação **ServeRest**, utilizando **Cypress 14**, **JavaScript** e **Cucumber (BDD)**.

## Contexto

Utilizando o framework Cypress e a linguagem JavaScript, são desenvolvidos cenários de testes automatizados para:

- **Frontend (E2E):** https://front.serverest.dev/
- **API (REST):** https://serverest.dev/

### Critérios de qualidade aplicados

- Adoção de boas práticas de desenvolvimento
- Qualidade na construção do código
- Aplicação de padrões de projeto (Page Object Model, Service Layer, Builder Pattern)
- Adequação e clareza das assertivas nos testes
- Escrita e organização dos cenários de teste (BDD / Gherkin)
- Qualidade e clareza nos commits

---

## Stack

| Ferramenta | Versão | Finalidade |
|---|---|---|
| [Cypress](https://cypress.io) | 14+ | Framework de testes E2E e API |
| [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) | ES2020+ | Linguagem |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | 26+ | BDD com Gherkin / Feature files |
| [@faker-js/faker](https://fakerjs.dev/) | 10+ | Geração de dados dinâmicos |
| [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) | 4+ | Relatório HTML |
| [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | — | Qualidade e formatação de código |

---

## Pré-requisitos

Antes de clonar e executar o projeto, certifique-se de ter instalado:

| Requisito | Versão mínima | Link |
|---|---|---|
| **Node.js** | 22 LTS | https://nodejs.org/ |
| **npm** | 10+ | Incluso com Node.js |
| **Git** | — | https://git-scm.com/ |

> **Dica:** Use [nvm](https://github.com/nvm-sh/nvm) (Linux/macOS) ou [nvm-windows](https://github.com/coreybutler/nvm-windows) para gerenciar versões do Node.
> O arquivo `.nvmrc` na raiz do projeto já define a versão correta: basta rodar `nvm use`.

---

## Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd serverest

# 2. Use a versão correta do Node (requer nvm)
nvm use

# 3. Instale as dependências
npm install
```

---

## Execução dos Testes

### Interface gráfica (modo interativo)

```bash
npm run cy:open
```

### Headless (modo CI)

```bash
# Todos os testes
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

### Allure

```bash
# Requer Allure CLI instalado globalmente
npm run report:allure
```

---

## Estrutura do Projeto

```
serverest/
├── cypress/
│   ├── api/                  # Testes de API (.feature + step definitions)
│   ├── e2e/                  # Testes E2E (.feature + step definitions)
│   ├── pages/                # Page Objects (UI)
│   ├── services/             # Service Layer (chamadas de API reutilizáveis)
│   ├── commands/             # Cypress custom commands
│   ├── fixtures/             # Dados estáticos (JSON)
│   ├── builders/             # Data Builders (criação de payloads)
│   ├── selectors/            # Seletores de elementos UI
│   ├── utils/                # Funções utilitárias
│   ├── contracts/            # Testes de contrato
│   ├── schemas/              # JSON Schemas para validação
│   └── support/
│       ├── e2e.js            # Entry point do Cypress (imports globais)
│       ├── commands.js       # Registro de custom commands
│       └── step_definitions/ # Step definitions compartilhadas
├── cypress.config.js         # Configuração do Cypress
├── eslint.config.js          # Regras de lint
├── .prettierrc               # Regras de formatação
├── .nvmrc                    # Versão do Node
└── package.json
```

---

## Convenções de Código

- **Arquivos:** `login.page.js`, `login.service.js`, `login.cy.js`, `login.feature`
- **Funções:** `camelCase`
- **Classes:** `PascalCase`
- **Constantes:** `UPPER_CASE`
- **Seletores:** prioridade `data-testid` → `data-cy` → `aria-label` → `role` → `id` → `name`
- **Esperas:** sempre via `cy.intercept()` + aliases — **nunca** `cy.wait(5000)`

## Convenções de Commit

Seguir o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(login): adiciona cenário BDD de login com credenciais inválidas
fix(api): corrige validação de schema na rota POST /usuarios
test(checkout): cobre fluxo alternativo de finalização de compra
```

---

## Qualidade de Código

```bash
# Verificar lint
npm run lint

# Formatar código
npm run format
```

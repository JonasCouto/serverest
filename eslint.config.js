const pluginCypress = require('eslint-plugin-cypress');

module.exports = [
  {
    plugins: { cypress: pluginCypress },
    rules: {
      'cypress/no-unnecessary-waiting': 'error',
      'cypress/no-force': 'warn',
      'cypress/assertion-before-screenshot': 'warn',
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
    languageOptions: {
      globals: {
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
        context: 'readonly',
      },
    },
  },
];


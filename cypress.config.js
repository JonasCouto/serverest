const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',

    specPattern: ['cypress/api/**/*.cy.js', 'cypress/e2e/**/*.cy.js'],
    supportFile: 'cypress/support/e2e.js',

    env: {
      apiUrl: 'https://serverest.dev',
    },

    video: true,
    screenshotsFolder: 'cypress/reports/screenshots',
    videosFolder: 'cypress/reports/videos',

    retries: {
      runMode: 2,
      openMode: 0,
    },

    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,

    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'ServeRest - Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportsDir: 'cypress/reports/html',
    },

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },
  },
});



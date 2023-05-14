import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://dmytro-lebedchenko.github.io/react_courses-app/#/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
});

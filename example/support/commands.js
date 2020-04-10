// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.overwrite('log', (originalFn, message, level, file, ...args) => {
  cy.task('logToRP', {
    file,
    level,
    message,
  });
  process.emit('data', () => {});
  return originalFn(message, ...args);
});

Cypress.Commands.add('rpwarn', (message, file) => {
  console.log('warn command!');
  cy.task('logToRP', {
    file,
    level: 'warn',
    message,
  });
  // ReportPortalReporter.sendLog(ReportPortalReporter.rpLevel.WARN, message, file);
});

// const { registerReportPortalCommands } = require('./../../lib/commands/reportPortalCommands');

// registerReportPortalCommands(Cypress, cy);

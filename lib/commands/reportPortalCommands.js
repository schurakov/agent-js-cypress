const registerReportPortalCommands = (Cypress, cy) => {
  Cypress.Commands.overwrite('log', (originalFn, message, level, file, ...args) => {
    cy.task('logToRP', {
      file,
      level,
      message,
    });
    process.emit('data', () => {});
    return originalFn(message, ...args);
  });

  Cypress.Commands.add('warn', (message, file) => {
    console.log('warn command!');
    cy.task('logToRP', {
      file,
      level: 'warn',
      message,
    });
    // ReportPortalReporter.sendLog(ReportPortalReporter.rpLevel.WARN, message, file);
  });
};

module.exports = { registerReportPortalCommands };

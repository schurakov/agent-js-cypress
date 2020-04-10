const ipc = require('node-ipc');

const createIpcClient = (onClientCreate) => {
  ipc.config.id = 'reportPortalReporter';
  ipc.config.retry = 1500;

  ipc.connectTo('reportportal', () => {
    ipc.of.reportportal.on('connect', () => {
      ipc.log('***connected to reportportal***');
    });
    ipc.of.reportportal.on('disconnect', () => {
      ipc.log('disconnected from reportportal');
    });
    onClientCreate(ipc.of.reportportal);
  });
};

module.exports = { createIpcClient };

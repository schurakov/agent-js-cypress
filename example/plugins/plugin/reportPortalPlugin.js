// const { startIPCServer } = require('./ipcServer');
// const { logToRPTask } = require('./pluginTasks');

// const reportPortalPlugin = (on) => {
//   const server = startIPCServer((server) => {
//     console.log('on start');
//   });
//   on('task', {
//     logToRP(log) {
//       console.log('log!!!', log);
//       console.log('emit log');
//       console.log('server', server);
//       server.emit('message', log);
//       return null;
//       // logToRPTask(server)(log);
//     },
//   });
//   process.on('exit', () => server.stop());
// };

// module.exports = reportPortalPlugin;

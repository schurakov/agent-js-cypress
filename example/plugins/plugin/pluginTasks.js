const logToRPTask = (server) => ({ message, level, file }) => {
  console.log('emit log');
  server.emit('message', {
    message,
    level,
    file,
  });
  return null;
};

module.exports = {
  logToRPTask,
};

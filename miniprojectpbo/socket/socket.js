const socketIo = require('socket.io');

let io;

const initWebSocket = (server) => {
  io = socketIo(server);
};

const sendDataChangeNotification = (data) => {
  io.emit('data_changed', {
    event: 'data_changed',
    message: 'Data kapal telah diperbarui.',
    data: [data]
  });
};

module.exports = { initWebSocket, sendDataChangeNotification };

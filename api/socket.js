let io;

module.exports = {
  init: (server) => {
    io = require('socket.io')(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('🟢 Cliente conectado:', socket.id);
    });
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io não inicializado!');
    }
    return io;
  }
};

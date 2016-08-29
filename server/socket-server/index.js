import io from 'socket.io';

export default function (server) {
  const socketServer = io(server);
  const connections = [];

  socketServer.on('connection', (socket) => {
    connections.push(socket);

    socket.on('fetchDocuments', (data) => {
      connections.forEach(connectedSocket => {
        connectedSocket.emit('fetchDocuments', data);
      });
    });

    socket.on('disconnect', () => {
      const index = connections.indexOf(socket);
      connections.splice(index, 1);
    });
  });
}


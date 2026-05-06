import { socket } from '../config/socket';

export const updateSocket = (token) => {
  socket.auth = { token };

  if (socket.connected) {
    socket.disconnect();
    console.log('socket disconnected');
  }
  socket.connect();
};

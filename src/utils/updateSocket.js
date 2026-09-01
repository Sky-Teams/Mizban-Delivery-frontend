import { socket } from '../config/socket';

export const updateSocket = (token) => {
  if (!token) {
    socket.disconnect();
    console.log('socket disconnected');
    return;
  }

  socket.auth = { token };

  if (socket.connected) {
    socket.disconnect();
    console.log('socket disconnected');
  }
  socket.connect();
};

import { socket } from '../config/socket';

export const sendLocation = (position) => {
  socket.emit('update_location', {
    currentLocation: {
      type: 'Point',
      coordinates: [position[0], position[1]],
    },
  });
};

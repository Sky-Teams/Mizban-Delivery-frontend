import { io } from 'socket.io-client';
import useAuthStore from '../store/useAuthStore';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// create socket without token first
export const socket = io(API_URL, {
  autoConnect: false,
});

// function to update token dynamically
export const updateSocketToken = (token) => {
  socket.auth = { token };

  if (socket.connected) {
    socket.disconnect();
  }

  socket.connect();
};

// optional: initialize once
export const initSocket = () => {
  const token = useAuthStore.getState().accessToken;

  socket.auth = { token };
  socket.connect();
};

// debug logs
socket.on('connect', () => {
  console.log('socket connected', socket.id);
});

socket.onAny((event, ...args) => {
  console.log('new event:', event, args);
});

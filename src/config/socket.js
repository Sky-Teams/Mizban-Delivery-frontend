import { io } from 'socket.io-client';
import useAuthStore from '../store/useAuthStore';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// create socket without token first
export const socket = io(API_URL, {
  autoConnect: false,
});

// function to update token dynamically
export const updateSocketToken = (token) => {
  if (socket.connected || !token) {
    socket.disconnect();
    return;
  }

  socket.auth = { token };
  if (!socket.connected) {
    socket.connect();
  }
};

// debug logs
socket.on('connect', () => {
  console.log('socket connected', socket.id);
});

// optional: initialize once
export const initSocket = () => {
  const token = useAuthStore.getState().accessToken;

  if (!token) {
    socket.disconnect();
    return;
  }

  socket.auth = { token };

  if (!socket.connected) {
    socket.connect();
  }
};

socket.onAny((event, ...args) => {
  console.log('new event:', event, args);
});

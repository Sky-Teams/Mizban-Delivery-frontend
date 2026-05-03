import { io } from 'socket.io-client';
const API_URL = import.meta.env.VITE_API_BASE_URL;

export const socket = io(API_URL, {
  auth: {
    // the token
    token: localStorage.getItem('token'),
  },
});

socket.on('connect', () => {
  console.log('socket connected', socket.id);
});

socket.onAny((event, ...args) => {
  console.log('new event:', event, args);
});

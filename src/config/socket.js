import { io } from 'socket.io-client';
const API_URL = import.meta.env.VITE_API_BASE_URL;
const user = JSON.parse(localStorage.getItem('user'));

export const socket = io(API_URL, {
  auth: {
    // the token
    token: user?.token // we have the token inside saved inside the user object
  },
});

socket.on('connect', () => {
  console.log('socket connected', socket.id);
});

socket.onAny((event, ...args) => {
  console.log('new event:', event, args);
});

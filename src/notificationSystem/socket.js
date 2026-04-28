import { io } from 'socket.io-client';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const socketUrl =
  import.meta.env.VITE_SOCKET_URL || apiBaseUrl?.replace(/\/api\/?$/, '') || '';

export const socket = io(socketUrl);

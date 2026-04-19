import { io } from "socket.io-client";
const api = "https://mizban-delivery-backend.onrender.com"

export const socket = io(api);

import { io } from "socket.io-client";
const API_URL = "https://mizban-delivery-backend.onrender.com" 

export const socket = io(API_URL, {
    auth: { // the admin's token
        token: localStorage.getItem("token")
    }
});

socket.on("connect", () => {
    console.log("socket connected", socket.id)
}) 

socket.onAny((event, ...args) => {
  console.log("new event:", event, args);
});
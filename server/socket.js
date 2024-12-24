import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"], // Allow connections from your frontend
    methods: ["GET", "POST"],
  },
});

export const getRecieverSocketId = (recieverID) => userSocketMap[recieverID];

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != undefined) {
    userSocketMap[userId] = socket.id;
    console.log("User socket map updated:", userSocketMap);
  }
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };

import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "node:http";

const app = express();
const server = createServer(app);
const sio = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  path: "/api",
});

sio.on("connection", (socket: Socket) => {
  console.log("New connection", socket.id);
  socket.on("ping", (data) => {
    console.log("Ping", `${data} from ${socket.id}`);
    socket.emit("pong", "Pong");
  });
  socket.on("disconnect", () => {
    console.log("Disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

import { Server } from "socket.io";

const io = new Server({
  /* options */
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("join", (room: string, email: string) => {
    if (!room.startsWith("/liveroom/")) {
      console.log(`Invalid join: ${room}`);
      return;
    }
    console.log(`User joined room ${room}: ${email}`);
    socket.join(room);
  });

  socket.on("message", (room: string, message: string, email: string) => {
    if (!room.startsWith("/liveroom/")) {
      console.log(`Invalid message: ${room}`);
      return;
    }
    console.log(`Message in room ${room}: ${message} from ${email}`);
    io.to(room).emit("message", message, email);
  });
});

io.listen(3000);

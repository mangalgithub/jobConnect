const { Server } = require("socket.io");

sockUsers = new Map();
function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Frontend
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinRoom", (email) => {
      socket.join(email);
      sockUsers.set(email, socket.id);
      sockUsers.forEach((value, key) => {
        console.log(`key: ${key}, value: ${value}`);
      }
      );
      console.log(`User with email ${email} joined room`);
    });

    socket.on("sendMessage", (message) => {
      console.log("Message received:", message);
      // let sockID = [...sockUsers.keys()].find(
      //   (key) => sockUsers.get(key) === message.to
      // );
      const sockID = sockUsers.get(message.to);
      console.log("sockId",sockID);
      if (sockID) {
        io.to(sockID).emit("newMessage", message);
      } else {
        console.log(`User with email ${message.to} not connected`);
      }
      // io.to(message.to).emit("newMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = {setupSocket};








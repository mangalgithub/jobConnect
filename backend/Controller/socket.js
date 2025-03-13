const { Server } = require("socket.io");

function setupSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "*", // Allow frontend to connect
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("joinRoom", (email) => {
            socket.join(email);
            console.log(`User with email ${email} joined room`);
        });

        socket.on("sendMessage", (message) => {
            io.to(message.to).emit("newMessage", message);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
}

module.exports = setupSocket;

const { Server } = require("socket.io");

let io;

function setupSocket(server) {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        socket.on("joinRoom", (email) => {
            socket.join(email);
            console.log(`User ${email} joined room`);
        });

        socket.on("sendMessage", (message) => {
            io.to(message.from).emit("newMessage", message); // ✅ Sender also receives message instantly
            io.to(message.to).emit("newMessage", message);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

    return io;
}

const getIO = () => io; // ✅ Export io instance

module.exports = { setupSocket, getIO };

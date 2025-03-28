const Chat = require("../models/Message.js");
const { getIO } = require("../Controller/socket.js"); // ✅ Import io instance

const getMessages = async (req, res) => {
    try {
        const messages = await Chat.find({ 
            $or: [{ from: req.params.email }, { to: req.params.email }] 
        }).sort("createdAt");

        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Error fetching messages" });
    }
};

const saveMessage = async (req, res) => {
    try {
        const { from, to, text } = req.body;
        const message = new Chat({ from, to, text });
        await message.save();

        const io = getIO(); // ✅ Get Socket.IO instance
        io.to(to).emit("newMessage", message);
        io.to(from).emit("newMessage", message); // ✅ Sender sees message instantly

        res.json({ success: true, message });
    } catch (error) {
        res.status(500).json({ error: "Error saving message" });
    }
};

module.exports = { getMessages, saveMessage };

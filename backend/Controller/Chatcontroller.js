const Chat = require("../models/Message.js");

const getMessages = async (req, res) => {
    try {
        console.log(req.params.email)
        const messages = await Chat.find({ $or: [{ from: req.params.email }, { to: req.params.email }] }).sort("createdAt");
      
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
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Error saving message" });
    }
};

module.exports = { getMessages, saveMessage };

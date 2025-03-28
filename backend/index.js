const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/mongoose");
const apiRoutes = require("./routes/apiRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const { setupSocket } = require("./Controller/socket.js");

const app = express();
const server = http.createServer(app);
setupSocket(server); // ✅ Initialize socket and store instance

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api", apiRoutes);
app.use("/chat", chatRoutes); // ✅ Chat routes now have socket support

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

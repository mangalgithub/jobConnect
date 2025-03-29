const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/mongoose");
const Addroute = require("./routes/AddRoute.js");
const apiRoutes = require("./routes/apiRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const downloadRoutes = require("./routes/downloadRoutes.js");
const EmailRoute = require("./routes/Email.js");
const UserRoute = require("./routes/UserRoute.js");
const getAllJobRoute = require("./routes/FetchJobs.js");
const ProfileRoute = require("./routes/Profilejobsekroute.js");
const {setupSocket } = require("./Controller/socket.js");

const app = express();
const server = http.createServer(app);
setupSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api", apiRoutes);
app.use("/download", downloadRoutes);
app.use("/user", UserRoute);
app.use("/apps", Addroute);
app.use("/seeker", ProfileRoute);
app.use("/alljob", getAllJobRoute);
app.use("/email", EmailRoute);
app.use("/chat", chatRoutes);
let roomMapping = {}; // Store recruiter-room mappings


const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

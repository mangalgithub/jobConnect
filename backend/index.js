const express = require("express");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/mongoose");
const apiRoutes = require("./routes/apiRoutes.js");
const downloadRoutes = require("./routes/downloadRoutes.js");
const UserRoute = require("./routes/UserRoute.js");
const Addroute = require("./routes/AddRoute.js");
const ProfileRoute = require("./routes/Profilejobsekroute.js");
const getAllJobRoute = require("./routes/FetchJobs.js");
const EmailRoute = require("./routes/Email.js");
const chatRoutes = require("./routes/chatRoutes.js");
const setupSocket=require("./Controller/socket.js")
const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

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

const port = 5000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;

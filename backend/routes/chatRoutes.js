const express = require("express");
const { getMessages, saveMessage } = require("../Controller/Chatcontroller.js");
const router = express.Router();

router.get("/:email", getMessages);
router.post("/", saveMessage);

module.exports = router;

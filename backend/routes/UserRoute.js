const express = require('express');
const { loginUser, registerUser, upload } = require('../Controller/UserController.js');
const router = express.Router();

router.post("/register",  registerUser);
router.post("/login", loginUser);

module.exports = router;

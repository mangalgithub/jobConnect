const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { type, name, pic, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password || !type || !pic) {
      console.log("Provide info");
      return res.status(400).json({
        message: "Not all information provided"
      });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedpassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedpassword, type, pic });
    if (user) {
      const token = generatetoken(user._id);
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        pic: user.pic,
        token: token,
        message: "User created"
      });
    } else {
      return res.status(400).json({
        message: "Failed to create user"
      });
    }
  } catch (error) {
    next(error);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    console.log("hi");
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = generatetoken(user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: user.type,
      pic: user.pic,
      token: token,
      message: "Login successful"
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { registerUser, loginUser };

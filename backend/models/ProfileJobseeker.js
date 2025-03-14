// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  institutions: [
    {
      name: String,
      startYear: String,
      endYear: String,
    },
  ],
  resume: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    required: true,
  },
  skills: [String],
});

module.exports = mongoose.model('Profile', userSchema);

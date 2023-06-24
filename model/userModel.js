const mongoose = require('mongoose');
const passport = require('passport');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'You must enter your email'],
    },

    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'You must enter your username'],
    },

    password: {
      type: String,
      trim: true,
      required: [true, 'You must enter your password'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

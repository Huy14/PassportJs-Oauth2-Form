const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema({
  googleID: {
    type: Number,
    unique: true,
    required: [true, 'User id is required'],
  },

  username: {
    type: String,
    unique: true,
    required: [true, 'You must enter your username'],
  },
});

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports = GoogleUser;

const mongoose = require('mongoose');

const githubUserSchema = new mongoose.Schema({
  githubID: {
    type: Number,
    unique: true,
    required: [true, 'User id is required'],
  },

  username: {
    type: String,
    required: [true, 'Username is required'],
  },
});

const GithubUser = mongoose.model('GithubUser', githubUserSchema);

module.exports = GithubUser;

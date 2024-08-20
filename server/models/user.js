const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  superliveId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  accLevel: {
    type: Number,
    enum: [
     -1, // banned
      0, // guest - unverified user
      2, // user
      2, // admin
      3, // superadmin
    ],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
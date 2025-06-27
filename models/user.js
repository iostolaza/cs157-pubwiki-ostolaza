
// models/user.js

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
  // add fullName if you want, but it's not required by your controller
});
module.exports = mongoose.model('User', userSchema);

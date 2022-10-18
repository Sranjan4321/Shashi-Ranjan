const mongoose = require('mongoose');
const UserScema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
const UserModel = mongoose.model('user', UserScema);
module.exports = UserModel;

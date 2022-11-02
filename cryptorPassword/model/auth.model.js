var mongoose = require('mongoose');
let crypto = require('crypto');
const AuthSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  hash: String,
  salt: String,
});

AuthSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};
AuthSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};
const User = mongoose.model('user', AuthSchema);
module.exports = User;

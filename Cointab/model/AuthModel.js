let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
  },
});
//hash password
UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
//get jwt token
UserSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECERET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//compare passWord
UserSchema.methods.comparePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model('user', UserSchema);

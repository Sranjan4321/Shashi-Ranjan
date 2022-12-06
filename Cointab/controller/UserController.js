const User = require('../model/AuthModel');

const cookie = require('cookie-parser');

exports.UserRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  res.send({
    message: 'registerd successfully',
    user,
  });
};
exports.UserLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({ message: 'Please Enter Email & Password' });
  }
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.send({ message: 'Invalid Email or Password' });
  }
  const IsPasswordMatched = await user.comparePassword(password);
  if (!IsPasswordMatched) {
    return res.send({ message: 'invalid Email or Password' });
  }
  // generate token
  let token = user.getJWTToken();
  //set time for token
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .cookie('token', token, options)
    .json({ message: 'login successfully', token });
};

exports.UserLogout = async (req, res, next) => {};

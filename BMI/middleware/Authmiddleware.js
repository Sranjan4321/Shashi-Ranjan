const jwt = require('jsonwebtoken');
require('dotenv').config();
const authmiddleware = async (req, res, next) => {
  let token;
  const { auth } = req.headers;
  //   console.log(auth);
  if (auth) {
    try {
      token = auth.split(' ')[1];
      //   console.log(token);
      const { userId } = jwt.verify(token, process.env.JWT_SECERET_KEY);
      req.body.userId = userId;
      next();
    } catch (err) {
      return console.log(err);
    }
  }
};
module.exports = authmiddleware;

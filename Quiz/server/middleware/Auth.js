const jwt = require('jsonwebtoken');
require('dotenv').config();
const Auth = async (req, res, next) => {
  let token;
  const { auths } = req.headers;
  if (auths) {
    try {
      token = auths.split(' ')[1];
      const { userId } = jwt.verify(token, process.env.JWT_SECERET_KEY);
      req.body.userId = userId;
      console.log(userId);
      next();
    } catch (err) {
      return console.log(err);
    }
  }
};
module.exports = Auth;

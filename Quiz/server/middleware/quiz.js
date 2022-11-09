const jwt = require('jsonwebtoken');
require('dotenv').config();
const QuizAuth = async (req, res, next) => {
  let token;
  //   console.log(req.headers);
  const { quizs } = req.headers;
  //   console.log(quizs);
  if (quizs) {
    try {
      token = quizs.split(' ')[1];
      const { userId, quizId, quizname } = jwt.verify(
        token,
        process.env.JWT_SECERET_KEY
      );
      req.body.userId = userId;
      req.body.quizId = quizId;
      req.body.quizname = quizname;
      next();
    } catch (err) {
      return console.log(err);
    }
  }
};
module.exports = QuizAuth;

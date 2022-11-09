const QuizRouter = require('express').Router();
const QuizModel = require('../model/quiz.model');
const QuizAuth = require('../middleware/quiz');
const jwt = require('jsonwebtoken');
QuizRouter.post('/createlink', (req, res) => {
  let { quizname, userId, quizId } = req.body;
  const token = jwt.sign(
    { userId, quizname, quizId },
    process.env.JWT_SECERET_KEY,
    {
      expiresIn: '2d',
    }
  );
  res.send({ message: 'token created', token });
});
QuizRouter.get('/quiz', QuizAuth, (req, res) => {
  if (req.body.userId) {
    res.send({ message: 'got quiz', data: req.body });
  } else {
    res.send({ message: 'something went wrong' });
  }
});
module.exports = QuizRouter;

const QuestionRouter = require('express').Router();
const QuestionModel = require('../model/question.model');
const QuizModel = require('../model/quiz.model');
const Auth = require('../middleware/Auth');
QuestionRouter.post('/question', Auth, async (req, res) => {
  let result = await new QuestionModel(req.body);
  result.save((err, success) => {
    if (err) {
      return res.send({ message: 'question not added to the database' });
    }
    return res.send({ message: 'question added', success });
  });
});
QuestionRouter.post('/quizinfo', Auth, async (req, res) => {
  let result = await new QuizModel(req.body);
  result.save((err, success) => {
    if (err) {
      return res.send({ message: 'question not added to the database' });
    }
    return res.send({ message: 'quiz created', success });
  });
});

module.exports = QuestionRouter;

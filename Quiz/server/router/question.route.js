const QuestionRouter = require('express').Router();
const QuestionModel = require('../model/question.model');
const Auth = require('../middleware/Auth');
QuestionRouter.post('/question', Auth, async (req, res) => {
  let result = await new QuestionModel(req.body);
  result.save((err, success) => {
    if (err) {
      return res.send({ message: 'question not added to the database' });
    }
    return res.send({ message: 'question added' });
  });
});

module.exports = QuestionRouter;

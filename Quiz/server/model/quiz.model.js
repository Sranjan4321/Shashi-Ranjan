const mongoose = require('mongoose');
const quizSchema = mongoose.Schema({
  quizname: { type: String, require: true },
  quizId: { type: String, require: true },
  userId: { type: String, require: true },
});
let QuizModel = mongoose.model('quizInfo', quizSchema);

module.exports = QuizModel;

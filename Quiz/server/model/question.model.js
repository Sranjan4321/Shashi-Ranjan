const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
  question: { type: String, require: true },
  option1: { type: String, require: true },
  option2: { type: String, require: true },
  option3: { type: String, require: true },
  option4: { type: String, require: true },
  answer: { type: Number, require: true },
  level: { type: Number, require: true },
  userId: { type: String, require: true },
  quizId: { type: String, require: true },
});
let QuestionModel = mongoose.model('question', questionSchema);

module.exports = QuestionModel;

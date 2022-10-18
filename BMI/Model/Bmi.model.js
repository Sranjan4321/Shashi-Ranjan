const mongoose = require('mongoose');
const BmiScema = mongoose.Schema({
  userId: String,
  height: Number,
  weight: Number,
  bmi: Number,
  ind: Number,
});
const BmiModel = mongoose.model('userdata', BmiScema);
module.exports = BmiModel;

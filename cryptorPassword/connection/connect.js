let mongoose = require('mongoose');
let connection = mongoose.connect('mongodb://localhost:27017/crpto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
module.exports = connection;

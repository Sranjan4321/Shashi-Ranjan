let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

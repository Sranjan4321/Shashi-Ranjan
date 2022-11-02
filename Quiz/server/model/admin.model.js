const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});
let AdminModel = mongoose.model('admin', AdminSchema);

module.exports = AdminModel;

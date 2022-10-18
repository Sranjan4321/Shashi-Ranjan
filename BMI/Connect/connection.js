const mongoose = require('mongoose');
require('dotenv').config();
let MONGODB_URL = process.env.MONGODB_URLS;
const connection = mongoose.connect(MONGODB_URL);
module.exports = connection;

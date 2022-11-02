const mongoose = require('mongoose');
require('dotenv').config();
let mongdb_url = process.env.MONGODB_URL;
let connection = mongoose.connect(mongdb_url);
module.exports = connection;

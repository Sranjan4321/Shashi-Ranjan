const express = require('express');
const app = express();
require('dotenv').config();
const connection = require('./config/database');
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('homepage');
});
//listen server
app.listen(PORT, async () => {
  try {
    await connection;
    console.log('mongoDb connected successfully');
  } catch {
    console.log('something went wrong in connecting mongoDb');
  }
  console.log(`server is running on server ${PORT}`);
});

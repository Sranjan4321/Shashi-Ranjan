const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const app = express();
const authRouter = require('./Router/Auth.router');
const BmiRouter = require('./Router/Bmi.router');
const connection = require('./Connect/connection');
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Home');
});
app.use(authRouter);
app.use(BmiRouter);
app.listen(port, async () => {
  try {
    await connection;
    console.log('database is connected successfully');
  } catch {
    console.log('error in loading database');
  }
  console.log(`server is lestning on port ${port}`);
});

const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./connect/connect');
const AdminRouter = require('./router/admin.router');
const QuestionRouter = require('./router/question.route');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('server is runing');
});
app.use(AdminRouter);
app.use(QuestionRouter);
app.listen(PORT, async () => {
  try {
    await connection;
    console.log('mongodb connected successfully');
  } catch (err) {
    console.log('something went wrong to connect');
  }
  console.log(`server is running on port ${PORT}`);
});

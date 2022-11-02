const express = require('express');
let app = express();
const authRouter = require('./routes/auth.route');
const connection = require('./connection/connect');

let PORT = process.env.PORT || 8000;
app.use(express.json());
app.get('/', (req, res) => {
  res.send('home');
});
app.use(authRouter);
app.listen(PORT, async () => {
  try {
    await connection;
    console.log('mongoDb connected successfully');
  } catch (err) {
    console.log('mongodb not connected');
  }
  console.log(`server is runing on port ${PORT}`);
});

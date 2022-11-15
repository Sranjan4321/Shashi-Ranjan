const express = require('express');
const app = express();
// const http = require('http');
// const { Server } = require('socket.io');
const connection = require('./connection/connect');
const UserRouter = require('./router/user.router');
const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.get('/', (req, res) => {
  res.send('server is runing');
});
//////socket connection//////

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });
// io.on('connection', (socket) => {
//   // console.log(`User Connected:${socket.id}`);
//   socket.on('send_message', (data) => {
//     socket.broadcast.emit('receive_message', data);
//   });
// });
app.use(UserRouter);
app.listen(8000, async () => {
  try {
    await connection;
    console.log('mongodb connected');
  } catch {
    console.log('something went wrrong');
  }
  console.log('server is Running on port 8000');
});

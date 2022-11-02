const express = require('express');
const authRouter = express.Router();
const User = require('../model/auth.model');
authRouter.post('/register', async (req, res) => {
  const { name, email } = req.body;
  let newUser = new User();
  newUser.name = name;
  newUser.email = email;
  newUser.setPassword(req.body.password);
  newUser.password = req.body.password;
  newUser.save((err, succ) => {
    if (err) {
      return res.send({ message: 'something went wrong try next time' });
    }
    return res.send({ message: 'signup successfull', succ });
  });
});

authRouter.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, (error, succ) => {
    if (error) {
      return res.send({ message: 'enternal error', error });
    }
    if (succ == null) {
      return res.send({ message: 'user not found' });
    } else {
      if (succ.validPassword(req.body.password)) {
        return res.send({ message: 'login successfully' });
      } else {
        return res.send({ message: 'user not authorized' });
      }
    }
  });
});
module.exports = authRouter;

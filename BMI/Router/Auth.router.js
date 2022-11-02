const express = require('express');
require('dotenv').config();
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

const authmiddleware = require('../middleware/Authmiddleware');
const UserModel = require('../Model/Auth.model');
const BmiModel = require('../Model/Bmi.model');

//////////////////getprofile////////////////
authRouter.get('/getProfile', authmiddleware, async (req, res) => {
  let _id = req.body.userId;
  let user = await UserModel.findOne({ _id });
  if (user) {
    const { name, email } = user;
    let bmidata = await BmiModel.find({ userId: req.body.userId });
    res.send({ message: 'user profile', user, bmidata });
  } else {
    res.send({ message: 'user not found' });
  }
});
////////////////register////////////////
authRouter.post('/register', async (req, res) => {
  const { email } = req.body;
  const result = await UserModel.find({ email });
  !result.length
    ? await new UserModel(req.body).save((err, success) => {
        if (err) {
          res.status(500).send({ message: 'Error occurred' });
        } else {
          res.status(201).send({ message: 'user register successfully' });
        }
      })
    : res.status(201).send({ message: 'email already exhist ' });
});
///////////////////login/////////////////////////
authRouter.post('/login', async (req, res) => {
  const result = await UserModel.findOne(req.body);
  if (result) {
    const { email, _id, name } = result;
    const token = jwt.sign({ userId: _id }, process.env.JWT_SECERET_KEY, {
      expiresIn: '2d',
    });
    res.send({ message: 'login success', token });
  } else {
    res.status(201).send({ message: 'Wrong credentials' });
  }
});
module.exports = authRouter;

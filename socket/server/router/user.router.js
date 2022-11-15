const jwt = require('jsonwebtoken');
const UserRouter = require('express').Router();
const UserModel = require('../model/User.model');
UserRouter.post('/register', async (req, res) => {
  console.log(req.body);
  let { email } = req.body;
  let IsExistUser = await UserModel.findOne({ email });
  if (IsExistUser) {
    return res.send({ message: 'user already Exist' });
  }
  let result = await new UserModel(req.body);
  result.save((err, succes) => {
    if (err) {
      return res.send({ message: 'not able to register try again' });
    }
    return res.send({ message: 'register successfully', user: succes });
  });
});
UserRouter.post('/login', async (req, res) => {
  const result = await UserModel.findOne(req.body);
  if (result) {
    const { email, _id, name } = result;
    const token = jwt.sign(
      { userId: _id, email, name },
      process.env.JWT_SECERET_KEY,
      {
        expiresIn: '2d',
      }
    );
    res.send({ message: 'login success', token });
  } else {
    res.status(201).send({ message: 'Wrong credentials' });
  }
});
module.exports = UserRouter;

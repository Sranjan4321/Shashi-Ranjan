const AdminRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const AdminModel = require('../model/admin.model');
AdminRouter.post('/register', async (req, res) => {
  let { email } = req.body;
  let IsExistUser = await AdminModel.findOne({ email });
  if (IsExistUser) {
    return res.send({ message: 'user already Exist' });
  }
  let result = await new AdminModel(req.body);
  result.save((err, succes) => {
    if (err) {
      return res.send({ message: 'not able to register try again' });
    }
    return res.send({ message: 'register successfully', user: succes });
  });
});
AdminRouter.post('/login', async (req, res) => {
  const result = await AdminModel.findOne(req.body);
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
module.exports = AdminRouter;

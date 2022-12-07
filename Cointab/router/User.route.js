const express = require('express');
const {
  UserRegister,
  UserLogin,
  UserLogout,
} = require('../controller/UserController');
const router = express.Router();
router.route('/register').post(UserRegister);
router.route('/login').post(UserLogin);
router.route('/logout').get(UserLogout);
module.exports = router;

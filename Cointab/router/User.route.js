const express = require('express');
const { UserRegister, UserLogin } = require('../controller/UserController');
const router = express.Router();

router.route('/register').post(UserRegister);
router.route('/login').post(UserLogin);
module.exports = router;

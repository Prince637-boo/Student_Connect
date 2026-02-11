const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');

const { validateRegister, validateLogin } = require('../middlewares/validate');

router.post('/register', validateRegister, authCtrl.register);
router.post('/login', validateLogin, authCtrl.login);
module.exports = router;
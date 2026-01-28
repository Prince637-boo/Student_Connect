const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const userCtrl = require('../controllers/user.controller');

router.get('/me', auth, userCtrl.getMe);
router.put('/me', auth, userCtrl.updateProfile);

module.exports = router;
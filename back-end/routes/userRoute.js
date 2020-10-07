const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete', userCtrl.deleteAccount);
router.get('/me', userCtrl.getUserProfile)

module.exports = router;
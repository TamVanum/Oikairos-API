const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController.js');

router.post('/signin', AuthController.signIn);

module.exports = router;

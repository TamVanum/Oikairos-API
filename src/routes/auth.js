const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController.js');

router.post('/signin', AuthController.signIn);
router.post('/create', AuthController.createUser);
router.post('/sendPasswordResetEmail', AuthController.sendPasswordResetEmail);
module.exports = router;

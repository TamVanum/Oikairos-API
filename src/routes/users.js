const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const validateUser = require('../middlewares/validateUser.js');
const verifyFirebaseToken = require('../middlewares/firebaseJwtAuth.js');

router.get('/',verifyFirebaseToken, UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', validateUser, UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
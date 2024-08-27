const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController.js');
const validateUser = require('../middlewares/validateUser.js');
const verifyFirebaseToken = require('../middlewares/firebaseAccessTokenAuth.js');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.get('/me', verifyFirebaseToken, UserController.getMe);
router.get('/', verifyFirebaseToken, UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', validateUser, UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/uid/', UserController.getUserByUid);
router.patch('/me/avatar', verifyFirebaseToken, upload.single('file'), (req, res) => UserController.uploadProfilePicture(req, res));
router.patch('/me', verifyFirebaseToken, UserController.updateMe);
module.exports = router;
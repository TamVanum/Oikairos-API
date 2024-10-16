const express = require('express');
const UserIntentsController = require('../controllers/userIntentController');
const router = express.Router();


router.get('/', UserIntentsController.getAllUserIntents);
router.get('/:id', UserIntentsController.getUserIntentById);
router.post('/', UserIntentsController.createUserIntent);
router.put('/:id', UserIntentsController.updateUserIntent);
router.delete('/:id', UserIntentsController.deleteUserIntent);

module.exports = router;
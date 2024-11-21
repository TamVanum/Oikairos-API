const express = require('express');
const UserIntentsController = require('../controllers/userIntentController');
const router = express.Router();
const validateUserIntentCreation = require('../middlewares/validateUserIntents.js');

router.get('/', UserIntentsController.getAllUserIntents);
router.get('/formatted/:id', UserIntentsController.getUserIntentWithJustPlanIdById);
router.get('/:id', UserIntentsController.getUserIntentById);
router.post('/', UserIntentsController.createUserIntent);
router.patch('/:id', UserIntentsController.updateUserIntent);
router.delete('/:id', UserIntentsController.deleteUserIntent);
router.post('/confirmation-mail', UserIntentsController.sendCreationMail);

module.exports = router;
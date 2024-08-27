const express = require('express');
const HydroponicsController = require('../controllers/hydroponicsController');
const router = express.Router();

router.get('/', HydroponicsController.getAllHydroponics);
router.get('/:id', HydroponicsController.getHydroponicById);
router.post('/', HydroponicsController.createHydroponic);
router.patch('/:id', HydroponicsController.updateHydroponic);
router.delete('/:id', HydroponicsController.deleteHydroponic);

module.exports = router;

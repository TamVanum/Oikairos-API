const express = require('express');
const PlantHistoryController = require('./controller');
const router = express.Router();

router.get('/', PlantHistoryController.getAllPlantHistories);
router.get('/:id', PlantHistoryController.getPlantHistoryById);
router.get('/actual/:id', PlantHistoryController.getActualHydroponicHistory);
router.post('/', PlantHistoryController.createPlantHistory);
router.patch('/:id', PlantHistoryController.updatePlantHistory);
router.delete('/:id', PlantHistoryController.deletePlantHistory);

module.exports = router;

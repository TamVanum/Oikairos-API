const express = require('express');
const PlantHistoryController = require('../controllers/plantHistoryController');
const router = express.Router();

router.get('/', PlantHistoryController.getAllPlantHistories);
router.get('/:id', PlantHistoryController.getPlantHistoryById);
router.post('/', PlantHistoryController.createPlantHistory);
router.patch('/:id', PlantHistoryController.updatePlantHistory);
router.delete('/:id', PlantHistoryController.deletePlantHistory);
router.post('/new-cycle', PlantHistoryController.startNewPlantHistoryCicle);

module.exports = router;

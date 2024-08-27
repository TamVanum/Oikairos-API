const express = require('express');
const PlantMetricSnapshotController = require('../controllers/plantMetricSnapshotController');
const router = express.Router();

router.get('/', PlantMetricSnapshotController.getAllPlantMetricSnapshots);
router.get('/:id', PlantMetricSnapshotController.getPlantMetricSnapshotById);
router.post('/', PlantMetricSnapshotController.createPlantMetricSnapshot);
router.patch('/:id', PlantMetricSnapshotController.updatePlantMetricSnapshot);
router.delete('/:id', PlantMetricSnapshotController.deletePlantMetricSnapshot);

module.exports = router;

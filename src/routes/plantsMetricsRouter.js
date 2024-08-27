const express = require('express');
const PlantsMetricsController = require('../controllers/plantsMetricsController');
const router = express.Router();


router.get('/', PlantsMetricsController.getAllPlantsMetrics);
router.get('/:id', PlantsMetricsController.getAllPlantsMetrics);
router.post('/', PlantsMetricsController.createPlantMetric);
router.patch('/:id', PlantsMetricsController.updatePlantMetric);
router.delete('/:id', PlantsMetricsController.deletePlantMetric);

module.exports = router;
const express = require('express');
const PlantsMetricsController = require('../controllers/plantsMetricsController');
const router = express.Router();
const validateUser = require('../middlewares/validateUser.js');
const verifyFirebaseToken = require('../middlewares/firebaseAccessTokenAuth.js');

router.get('/me', verifyFirebaseToken, PlantsMetricsController.getPlantMetricMe);
router.get('/', PlantsMetricsController.getAllPlantsMetrics);
router.get('/:id', PlantsMetricsController.getAllPlantsMetrics);
router.post('/', verifyFirebaseToken, PlantsMetricsController.createPlantMetric);
router.patch('/:id', PlantsMetricsController.updatePlantMetric);
router.delete('/:id', PlantsMetricsController.deletePlantMetric);

module.exports = router;
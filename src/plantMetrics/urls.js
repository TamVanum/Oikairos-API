const express = require('express');
const PlantsMetricsController = require('./controller.js');
const router = express.Router();
const validateUser = require('../accounts/middlewares/validateUser.js');
const verifyFirebaseToken = require('../security/firebaseAccessTokenAuth.js');

router.get('/me', verifyFirebaseToken, PlantsMetricsController.getPlantMetricMe);
router.get('/', PlantsMetricsController.getAllPlantsMetrics);
router.get('/:id', PlantsMetricsController.getAllPlantsMetrics);
router.post('/', verifyFirebaseToken, PlantsMetricsController.createPlantMetric);
router.patch('/:id', PlantsMetricsController.updatePlantMetric);
router.delete('/:id', PlantsMetricsController.deletePlantMetric);

module.exports = router;
const express = require('express');
const PlanController = require('./controller');
const router = express.Router();

router.get('/', PlanController.getAllPlans);
router.get('/:id', PlanController.getPlanById);
router.post('/', PlanController.createPlan);
router.put('/:id', PlanController.updatePlan);
router.delete('/:id', PlanController.deletePlan);

module.exports = router;
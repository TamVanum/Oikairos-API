const express = require('express');
const PlanController = require('../controllers/planController');
const router = express.Router();

router.get('/', PlanController.getAllPlans);
router.get('/:id', PlanController.getPlanById);
router.post('/', PlanController.createPlan);
router.put('/:id', PlanController.updatePlan);
router.delete('/:id', PlanController.deletePlan);

module.exports = router;
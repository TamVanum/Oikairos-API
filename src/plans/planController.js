
const PlanService = require('./planService.js');
// const sendEmailMailerSend = require('../utils/sendEmailMailerSend.js');

class PlanController {
    static async getAllPlans(req, res) {
        try {
            const plans = await PlanService.getAllPlans();
            res.json(plans);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getPlanById(req, res) {
        try {
            const plan = await PlanService.getPlanById(req.params.id);
            res.json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createPlan(req, res) {
        try {
            const plan = await PlanService.createPlan(req.body);
            res.status(201).json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updatePlan(req, res) {
        try {
            const plan = await PlanService.updatePlan(req.params.id, req.body);
            res.json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deletePlan(req, res) {
        try {
            await PlanService.deletePlan(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PlanController;
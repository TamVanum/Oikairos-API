
const PlanService = require('./services.js');
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

    static async updatePlan(req, res) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedPlan = await PlanService.updatePlan(id, updatedData);

            if (!updatedPlan) {
                return res.status(404).json({ message: 'Plan not found' });
            }

            res.status(200).json(updatedPlan);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = PlanController;
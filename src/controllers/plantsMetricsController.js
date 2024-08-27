
const PlantsMetricsService = require('../services/plantsMetricsService.js');

class PlantsMetricsController {
    static async getAllPlantsMetrics(req, res) {
        try {
            const plans = await PlantsMetricsService.getAllPlantsMetrics();
            res.json(plans);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getPlantMetricById(req, res) {
        try {
            const plan = await PlantsMetricsService.getPlantMetricById(req.params.id);
            res.json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createPlantMetric(req, res) {
        try {
            const plan = await PlantsMetricsService.createPlantMetric(req.body);
            res.status(201).json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updatePlantMetric(req, res) {
        try {
            const plan = await PlantsMetricsService.updatePlantMetric(req.params.id, req.body);
            res.json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deletePlantMetric(req, res) {
        try {
            await PlantsMetricsService.deletePlantMetric(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PlantsMetricsController;
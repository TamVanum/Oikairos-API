const PlantsMetricsRepository = require('../repositories/plantsMetricsRepository.js');

const plantsMetricsRepository = new PlantsMetricsRepository()

class PlantsMetricsService {
    static async getAllPlantsMetrics() {
        return plantsMetricsRepository.getAll();
    }

    static async getPlantMetricById(id) {
        return plantsMetricsRepository.getById(id);
    }

    static async createPlantMetric(userData) {
        return plantsMetricsRepository.create(userData);
    }

    static async updatePlantMetric(id, userData) {
        return plantsMetricsRepository.update(id, userData);
    }

    static async deletePlantMetric(id) {
        return plantsMetricsRepository.delete(id);
    }
}

module.exports = PlantsMetricsService;
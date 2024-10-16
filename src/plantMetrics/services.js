const PlantsMetricsRepository = require('./repository.js');

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

    static async getPlantMetricMe(userId) {
        return plantsMetricsRepository.getMetricsMe(userId);
    }

    static async createDefaultMetric(user) {
        const data = {
            "water_flow": true,
            "name": "lechuga",
            "user_id": user,
            "attributes": [
                {
                    "unit_of_measurement": "°C",
                    "name": "water_temperature",
                    "maximum": 24,
                    "minimum": 18
                },
                {
                    "unit_of_measurement": "°C",
                    "name": "ambient_temperature",
                    "maximum": 22,
                    "minimum": 16
                },
                {
                    "unit_of_measurement": "pH",
                    "name": "ph_level",
                    "maximum": 6.5,
                    "minimum": 5.5
                },
                {
                    "unit_of_measurement": "µS/cm",
                    "name": "electrical_conductivity",
                    "maximum": 1400,
                    "minimum": 800
                }
            ]
        }
        return plantsMetricsRepository.create(data);
    }

    // static async getMetricsMe() {
    //     return plantsMetricsRepository.getMetricsMe();
    // }
}

module.exports = PlantsMetricsService;
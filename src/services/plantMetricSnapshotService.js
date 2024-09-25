const PlantMetricSnapshotRepository = require('../repositories/plantMetricSnapshotRepository.js');

const plantMetricSnapshotRepository = new PlantMetricSnapshotRepository();

class PlantMetricSnapshotService {
    static async getAllPlantMetricSnapshots() {
        return plantMetricSnapshotRepository.getAll();
    }

    static async getPlantMetricSnapshotById(id) {
        return plantMetricSnapshotRepository.getById(id);
    }

    static async createPlantMetricSnapshot(data) {
        return plantMetricSnapshotRepository.create(data);
    }

    static async updatePlantMetricSnapshot(id, data) {
        return plantMetricSnapshotRepository.update(id, data);
    }

    static async deletePlantMetricSnapshot(id) {
        return plantMetricSnapshotRepository.delete(id);
    }

}

module.exports = PlantMetricSnapshotService;

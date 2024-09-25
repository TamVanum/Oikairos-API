const PlantHistoryRepository = require('../repositories/plantHistoryRepository.js');

const plantHistoryRepository = new PlantHistoryRepository();

class PlantHistoryService {
    static async getAllPlantHistories() {
        return plantHistoryRepository.getAll();
    }

    static async getPlantHistoryById(id) {
        return plantHistoryRepository.getById(id);
    }

    static async createPlantHistory(data) {
        return plantHistoryRepository.create(data);
    }

    static async updatePlantHistory(id, data) {
        return plantHistoryRepository.update(id, data);
    }

    static async deletePlantHistory(id) {
        return plantHistoryRepository.delete(id);
    }

    // Optimización de inicio de nuevo ciclo con transacción
    static async startNewPlantHistoryCicle(hydroponicId) {
        return await plantHistoryRepository.startNewPlantHistoryTransaction(hydroponicId);
    }
}

module.exports = PlantHistoryService;

const PlantHistoryRepository = require('./repository.js');
const HydroponicsService = require('../hydroponic/services.js');

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

    static async getActualHydroponicHistory(id){
        return plantHistoryRepository.getLatestPlantHistoryByHydroponicId(id)
    }

}

module.exports = PlantHistoryService;

const HydroponicsRepository = require('../repositories/hydroponicsRepository.js');

const hydroponicsRepository = new HydroponicsRepository();

class HydroponicsService {
    static async getAllHydroponics() {
        return hydroponicsRepository.getAll();
    }

    static async getHydroponicById(id) {
        return hydroponicsRepository.getById(id);
    }

    static async createHydroponic(data) {
        return hydroponicsRepository.create(data);
    }

    static async updateHydroponic(id, data) {
        return hydroponicsRepository.update(id, data);
    }

    static async deleteHydroponic(id) {
        return hydroponicsRepository.delete(id);
    }
}

module.exports = HydroponicsService;

const HydroponicsRepository = require('./repository.js');
const PlantMetricsRepository = require('../plantMetrics/repository.js');
const PlantMetricSnapshotRepository = require('../plantMetricSnapshots/repository.js');
const PlantHistoryRepository = require('../plantHistory/repository.js');

const plantMetricSnapshotRepository = new PlantMetricSnapshotRepository();
const plantMetricsRepository = new PlantMetricsRepository();
const hydroponicsRepository = new HydroponicsRepository();
const plantHistoryRepository = new PlantHistoryRepository();

const { getMQTTBrokerInstance } = require('../config/mqtt.js');

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

    static async getHydroponicByUserId(userId) {
        return hydroponicsRepository.getHydroponicByUserId(userId);
    }

    static async getHydroponicWithPlants() {
        return hydroponicsRepository.getHydroponicWithPlants();
    }

    static async getHydroponicsWithPlantsByUserId(userId) {
        return hydroponicsRepository.getHydroponicsWithPlantsByUserId(userId);
    }

    static async getHydroponicMetricsInUse(hydroponicId) {
        const lastMetric = await plantMetricSnapshotRepository.getPlantMetricsByHydroponicId(hydroponicId);
        const metrics = await plantMetricsRepository.getById(lastMetric.plantMetricSnapshot.at(-1).plantMetricId);
        return metrics;
    }

    static async getHydroponicByUserIdInArrayWithoutUsersData(userId) {
        const hydroponicData = await hydroponicsRepository.getHydroponicByUserIdInArray(userId);
        hydroponicData.forEach(item => {
            delete item.users;
        });
        return hydroponicData;
    }

    static async getHydroponicByUserIdInArray(userId) {
        const hydroponicData = await hydroponicsRepository.getHydroponicByUserIdInArray(userId);

        return hydroponicData;
    }

    static async desactivateHydroponic(hydroponicId) {
        return hydroponicsRepository.update(hydroponicId, { "active": false });
    }

    static async activateHydroponic(hydroponicId) {
        return hydroponicsRepository.update(hydroponicId, { "active": true });
    }

    static async updatePlantHistoryRoomId(hydroponicId, roomId) {
        try {
            const aedes = getMQTTBrokerInstance();
            if (roomId === null) {
                roomId = "";
            }

            aedes.publish({
                topic: `esp8266/${hydroponicId}/setup`,
                payload: JSON.stringify({ roomId }),
                qos: 0,
                retain: false
            }, (err) => {
                if (err) {
                    throw new Error('Failed to publish to MQTT broker');
                }
                console.log(`Published historyId ${roomId} to hydroponic ${hydroponicId}`);
            });

        } catch (error) {
            console.error('Error sending historyId to device:', error);
            throw error;
        }
    }

    static async startNewPlantHistoryCicle(hydroponicId) {
        const new_cycle = await plantHistoryRepository.startNewPlantHistoryTransaction(hydroponicId);
        const activate = await HydroponicsService.activateHydroponic(hydroponicId);
        const connect_to_new_cycle = await HydroponicsService.updatePlantHistoryRoomId(hydroponicId, new_cycle);
        const update_current_cycle = await hydroponicsRepository.update(hydroponicId, { "currentCycle": new_cycle });
        return new_cycle;
    }

    static async endPlantHistoryCicle(hydroponicId) {
        const cycle = await plantHistoryRepository.endPlantHistoryTransaction(hydroponicId);
        const desactivate = await HydroponicsService.desactivateHydroponic(hydroponicId);
        const connect_to_none_hydroponic = await HydroponicsService.updatePlantHistoryRoomId(hydroponicId, null);
        return cycle;
    }
    // static async asociatePlantMetricsToHydroponic(hydroponicId, plantMetricId) {
    //     const plantMetric = await plantMetricsRepository.getById(plantMetricId);
    //     const hydroponic = await hydroponicsRepository.getById(hydroponicId);
    //     hydroponic.plantMetrics.push(plantMetric);
    // }


}

module.exports = HydroponicsService;

const HydroponicsRepository = require('../repositories/hydroponicsRepository.js');
const PlantMetricsRepository = require('../repositories/plantsMetricsRepository.js');
const PlantMetricSnapshotRepository = require('../repositories/plantMetricSnapshotRepository.js');
const PlantHistoryRepository = require('../repositories/plantHistoryRepository.js');

const plantMetricSnapshotRepository = new PlantMetricSnapshotRepository();
const plantMetricsRepository = new PlantMetricsRepository();
const hydroponicsRepository = new HydroponicsRepository();
const plantHistoryRepository = new PlantHistoryRepository();

const { getMQTTBrokerInstance } = require('../config/mqtt');

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

    static async updatePlantHistoryRoomId(hydroponicId, historyId) {
        try {
            const aedes = getMQTTBrokerInstance();

            aedes.publish({
                topic: `esp8266/${hydroponicId}/setup`,
                payload: JSON.stringify({ historyId }),
                qos: 0,
                retain: false
            }, (err) => {
                if (err) {
                    throw new Error('Failed to publish to MQTT broker');
                }
                console.log(`Published historyId ${historyId} to device ${deviceId}`);
            });

        } catch (error) {
            console.error('Error sending historyId to device:', error);
            throw error;
        }
    }

    // static async asociatePlantMetricsToHydroponic(hydroponicId, plantMetricId) {
    //     const plantMetric = await plantMetricsRepository.getById(plantMetricId);
    //     const hydroponic = await hydroponicsRepository.getById(hydroponicId);
    //     hydroponic.plantMetrics.push(plantMetric);
    // }


}

module.exports = HydroponicsService;

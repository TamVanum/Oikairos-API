const PlantMetricSnapshotRepository = require('./repository.js');
const PlantsMetricsService = require("../plantMetrics/services.js")

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

    static async addMetricSnapshot(hydroponicId, plantMetricId) {

        const plantMetricInstance = await plantMetricSnapshotRepository.getPlantMetricsInstanceByHydroponicId(hydroponicId);
        const plantMetricData = plantMetricInstance.data();
        const data = {
            "startDate": new Date().toISOString(),
            "endDate": null,
            "plantMetricId": plantMetricId
        }
        
        const plantMetricInstanceLastMetric = plantMetricData.plantMetricSnapshot[plantMetricData.plantMetricSnapshot.length - 1]
        if (plantMetricInstanceLastMetric.plantMetricId !== plantMetricId){
            plantMetricData.plantMetricSnapshot.push(data);
            plantMetricInstanceLastMetric.endDate = new Date().toISOString();
        }
        console.log(plantMetricInstanceLastMetric)
        console.log("5")
        return plantMetricSnapshotRepository.update(plantMetricInstance.id, plantMetricData);
    }
    static async createDefaultMetricSnapshot(hydroponicId, plantHistoryId, plantMetricId) {
        const data = {
            "createdAt": new Date(),
            "hydroponicId": hydroponicId,
            "plantHistoryId": plantHistoryId || null,
            "plantMetricSnapshot": [
                {
                    "startDate": new Date().toISOString(),
                    "endDate": null,
                    "plantMetricId": plantMetricId
                }
            ]
        }
        const createdSnapshot = await plantMetricSnapshotRepository.create(data);
        return createdSnapshot;
    }
    

    static async getMetricsOfASnapshotCollection(hydroponicId){
        const plantMetricsSnapshot = await plantMetricSnapshotRepository.getPlantMetricsByHydroponicId(hydroponicId);
        plantMetricsSnapshot.plantMetricSnapshot = await Promise.all(
            plantMetricsSnapshot.plantMetricSnapshot.map(async element => {
                const plantMetric = await PlantsMetricsService.getPlantMetricById(element.plantMetricId);
                element['plantMetricData'] = plantMetric; 
                return element;
            })
        );
        return plantMetricsSnapshot;
    }
}

module.exports = PlantMetricSnapshotService;

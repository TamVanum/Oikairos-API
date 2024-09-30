const { db } = require('../config/firebase.js');
const BaseRepository = require('./baseRepository.js');

class PlantMetricSnapshotRepository extends BaseRepository {
    constructor() {
        super(db.collection('plantMetricSnapshot'));
    }

    async getPlantMetricsByHydroponicId(hydroponicId) {
        const plantMetricsSnapshot = await this.collection.where('hydroponicId', '==', hydroponicId).orderBy('createdAt', 'desc').get();
        return plantMetricsSnapshot.docs[0].data();
    }

    async getPlantMetricsInstanceByHydroponicId(hydroponicId) {
        const plantMetricsSnapshot = await this.collection.where('hydroponicId', '==', hydroponicId).orderBy('createdAt', 'desc').get();
        return plantMetricsSnapshot.docs[0];
    }
}

module.exports = PlantMetricSnapshotRepository;
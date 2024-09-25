const { db } = require('../config/firebase.js');
const BaseRepository = require('./baseRepository.js');

class PlantMetricSnapshotRepository extends BaseRepository {
    constructor() {
        super(db.collection('plantMetricSnapshot'));
    }

    async getPlantMetricsByHydroponicId(hydroponicId){
        const plantMetricsSnapshot = await this.collection.where('hydroponicId', '==', hydroponicId).get();
        return plantMetricsSnapshot.docs[0].data();
    }
}

module.exports = PlantMetricSnapshotRepository;
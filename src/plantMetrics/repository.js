const { db } = require('../config/firebase.js');
const BaseRepository = require('../shared/baseRepository.js');

class PlantsMetricsRepository extends BaseRepository {
    constructor() {
        super(db.collection('plantsMetrics'));
    }

    async create(data) {
        const docRef = this.collection.doc();
        data.id = docRef.id;
        await docRef.set(data);
        return data;
    }

    async getMetricsMe(id) {
        const metricsMe = await this.collection.where('user_id', '==', id).get();
        return metricsMe.docs.map(doc => doc.data());
    }
}

module.exports = PlantsMetricsRepository;
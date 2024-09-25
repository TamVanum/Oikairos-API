const { db } = require('../config/firebase.js');
const BaseRepository = require('./baseRepository.js');

class PlantsMetricsRepository extends BaseRepository {
    constructor() {
        super(db.collection('plantsMetrics'));
    }
}

module.exports = PlantsMetricsRepository;
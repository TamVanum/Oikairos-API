const { db } = require('../config/firebase.js');
const BaseRepository = require('./baseRepository.js');

class PlantMetricSnapshotRepository extends BaseRepository {
    constructor() {
        super(db.collection('plantMetricSnapshot'));
    }
}

module.exports = PlantMetricSnapshotRepository;
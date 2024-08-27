const { db } = require('../config/firebase.js');
const BaseRepository = require('./baseRepository.js');

class PlantHistoryRepository extends BaseRepository {
    constructor() {
        super(db.collection('plantHistory'));
    }
}

module.exports = PlantHistoryRepository;

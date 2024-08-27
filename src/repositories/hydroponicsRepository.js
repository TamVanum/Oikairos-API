const { db } = require('../config/firebase.js');
const BaseRepository = require('./baseRepository.js');

class HydroponicsRepository extends BaseRepository {
    constructor() {
        super(db.collection('hydroponics'));
    }
}

module.exports = HydroponicsRepository;
const { db } = require('../config/firebase.js');
const BaseRepository = require('./baseRepository.js');

class PlanRepository extends BaseRepository {
    constructor() {
        super(db.collection('plans'));
    }
}

module.exports = PlanRepository;
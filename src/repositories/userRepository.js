const {db} = require('../utils/firebase.js');
const BaseRepository = require('./baseRepository.js');

class UserRepository extends BaseRepository {
    constructor() {
        super(db.collection('users'));
    }
}

module.exports = UserRepository;
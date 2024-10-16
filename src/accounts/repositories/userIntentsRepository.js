const { db } = require("../../config/firebase");
const BaseRepository = require("../../shared/baseRepository");


class UserIntentsRepository extends BaseRepository {
    constructor() {
        super(db.collection('userIntents'));
    }
}

module.exports = UserIntentsRepository;
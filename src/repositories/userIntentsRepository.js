const { db } = require("../utils/firebase");
const BaseRepository = require("./baseRepository");


class UserIntentsRepository extends BaseRepository {
    constructor() {
        super(db.collection('userIntents'));
    }
}

module.exports = UserIntentsRepository;
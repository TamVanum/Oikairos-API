const { db } = require('../config/firebase.js');
const BaseRepository = require('./baseRepository.js');

class PlantHistoryRepository extends BaseRepository {
    constructor() {
        super(db.collection('plantHistory'));
    }

    async getLatestPlantHistoryByHydroponicId(hydroponicId) {
        const plantHistorySnapshot = await this.collection
            .where('hydroponicId', '==', hydroponicId)
            .orderBy('startDate', 'desc')
            .limit(1)
            .get();
        return plantHistorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0] || null;
    }

    async endPlantHistoryCicle(plantHistoryId) {
        const plantHistory = await this.getById(plantHistoryId);
        if (plantHistory && plantHistory.endDate == null) {
            plantHistory.endDate = new Date();
            return await this.update(plantHistoryId, plantHistory);
        }
        return null;
    }

    async newPlantHistoryCicle(hydroponicId) {
        const data = {
            hydroponicId,
            startDate: new Date(),
            endDate: null,
            plantHistory: []
        };
        return await this.create(data);
    }

    async startNewPlantHistoryTransaction(hydroponicId) {
        return db.runTransaction(async (transaction) => {
            const latestPlantHistory = await this.getLatestPlantHistoryByHydroponicId(hydroponicId);
            if (latestPlantHistory && !latestPlantHistory.endDate) {
                latestPlantHistory.endDate = new Date();
                transaction.update(this.collection.doc(latestPlantHistory.id), latestPlantHistory);
            }

            const newPlantHistoryData = {
                hydroponicId,
                startDate: new Date(),
                endDate: null,
                plantHistory: []
            };

            const newPlantHistoryRef = this.collection.doc();
            transaction.set(newPlantHistoryRef, newPlantHistoryData);

            return newPlantHistoryRef.id;
        });
    }

    async endPlantHistoryTransaction(hydroponicId) {
        return db.runTransaction(async (transaction) => {
            const latestPlantHistory = await this.getLatestPlantHistoryByHydroponicId(hydroponicId);

            if (latestPlantHistory && !latestPlantHistory.endDate) {
                latestPlantHistory.endDate = new Date();
                transaction.update(this.collection.doc(latestPlantHistory.id), latestPlantHistory);
                return latestPlantHistory.id;
            }

            return latestPlantHistory.id;
        });
    }
}

module.exports = PlantHistoryRepository;

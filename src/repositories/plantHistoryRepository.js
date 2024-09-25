const { db } = require('../config/firebase.js');
const BaseRepository = require('./baseRepository.js');

class PlantHistoryRepository extends BaseRepository {
    constructor() {
        super(db.collection('plantHistory'));
    }

    // Obtener el historial más reciente para un hydroponicId
    async getLatestPlantHistoryByHydroponicId(hydroponicId) {
        const plantHistorySnapshot = await this.collection
            .where('hydroponicId', '==', hydroponicId)
            .orderBy('startDate', 'desc')
            .limit(1)
            .get();
        return plantHistorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0] || null;
    }

    // Finalizar el ciclo de un historial existente
    async endPlantHistoryCicle(plantHistoryId) {
        const plantHistory = await this.getById(plantHistoryId);
        if (plantHistory && !plantHistory.endDate) { // Asegurarse de que no se sobreescriba si ya tiene endDate
            plantHistory.endDate = new Date();
            return await this.update(plantHistoryId, plantHistory);
        }
        return null; // No se necesita realizar ninguna operación si el ciclo ya está cerrado
    }

    // Iniciar un nuevo ciclo de historial de plantas
    async newPlantHistoryCicle(hydroponicId) {
        const data = {
            hydroponicId,
            startDate: new Date(),
            endDate: null,
            plantHistory: []
        };
        return await this.create(data);
    }

    // Usar una transacción para finalizar el ciclo anterior e iniciar uno nuevo
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
}

module.exports = PlantHistoryRepository;

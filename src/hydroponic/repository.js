const { db } = require('../config/firebase.js');
const BaseRepository = require('../shared/baseRepository.js');

class HydroponicsRepository extends BaseRepository {
    constructor() {
        super(db.collection('hydroponics'));
    }

    async getHydroponicByUserId(userId) {
        const hydroponicsSnapshot = await this.collection.where('userId', '==', userId).get();
        return hydroponicsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getHydroponicByUserIdInArray(userId) {
        const hydroponicsSnapshot = await this.collection.where('users', 'array-contains', userId).get();
        return hydroponicsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getCountHydroponicByUserIdInArray(userId) {
        const hydroponicsSnapshot = await this.collection.where('users', 'array-contains', userId).get();
        return hydroponicsSnapshot.size;
    }

    async getHydroponicWithPlants() {
        const hydroponics = await this.getAll();
        const hydroponicWithPlants = await Promise.all(hydroponics.map(async hydroponic => {
            const plants = await db.collection('plants').where('hydroponicId', '==', hydroponic.id).get();
            return {
                ...hydroponic,
                plants: plants.docs.map(plant => plant.data())
            };
        }));
        return hydroponicWithPlants
    }

    async getHydroponicsWithPlantsByUserId(userId) {
        const hydroponics = await this.getHydroponicByUserIdInArray(userId);

        const hydroponicWithPlants = await Promise.all(hydroponics.map(async hydroponic => {
            const plantsSnapshot = await db.collection('plantHistory').where('hydroponicId', '==', hydroponic.id).get();
            const plants = plantsSnapshot.docs.map(plantDoc => ({ id: plantDoc.id, ...plantDoc.data() }));
            return {
                ...hydroponic,
                plants
            };
        }));

        return hydroponicWithPlants;
    }

}

module.exports = HydroponicsRepository;
// src/repositories/baseRepository.js
class BaseRepository {
    constructor(collection) {
        this.collection = collection;
    }

    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async getById(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) {
            throw new Error('Document not found');
        }
        return { id: doc.id, ...doc.data() };
    }

    async create(data) {
        const docRef = await this.collection.add(data);
        return { id: docRef.id, ...data };
    }

    async update(id, data) {
        await this.collection.doc(id).update(data);
        return { id, ...data };
    }

    async delete(id) {
        await this.collection.doc(id).delete();
    }
}

module.exports = BaseRepository;

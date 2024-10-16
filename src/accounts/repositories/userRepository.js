const { db } = require('../../config/firebase.js');
const BaseRepository = require('../../shared/baseRepository.js');
const FileService = require('../../utils/fileService.js');

class UserRepository extends BaseRepository {
    constructor() {
        super(db.collection('users'));
    }

    async getUserByUid(uid) {
        try {
            const snapshot = await this.collection.where('auth_uid', '==', uid).get();

            console.log("snapshot", snapshot);
            if (snapshot.empty) {
                throw new Error('User not found');
            }
            return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            throw new Error('Error al obtener el usuario');
        }
    }

    async getUserDataWithoutSensitiveInfo(uid) {
        try {
            const user = await this.getUserByUid(uid);
            delete user.auth_uid;
            delete user.created_at;
            return user;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            throw new Error('Error al obtener el usuario');
        }
    }

    async updateUserProfilePicture(uid, publicUrl) {
        try {
            const user = await this.getUserDataWithoutSensitiveInfo(uid);
            this.collection.doc(user.id).update({ avatar: publicUrl });

            return { ...user, avatar: publicUrl };
        } catch (error) {
            console.error('Error al subir la foto de perfil:', error);
            throw new Error('Error al subir la foto de perfil');
        }
    }

    async getMe(uid) {
        try {
            const user = await this.getUserDataWithoutSensitiveInfo(uid);
            delete user.auth_uid;
            return user;
        } catch (error) {
            console.error('Error al obtener el usuario:', error);
            throw new Error('Error al obtener el usuario');
        }
    }

    async updateMe(uid, data) {
        try {
            const user = await this.getUserDataWithoutSensitiveInfo(uid);
            this.collection.doc(user.id).update(data);
            return { ...user, ...data };
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            throw new Error('Error al actualizar el usuario');
        }

    }
}

module.exports = UserRepository;
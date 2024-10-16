const UserRepository = require('../repositories/userRepository.js');
const HydroponicsRepository = require('../../hydroponic/repository.js');
const fileUpload = require('../../utils/fileService.js');
const userRepository = new UserRepository()
const hydroponicsRepository = new HydroponicsRepository()

const users = [];

class UserService {
    static async getAllUsers() {
        return userRepository.getAll();
    }

    static async getUserById(id) {
        return userRepository.getById(id);
    }

    static async createUser(userData) {
        userData.created_at = new Date();
        userData.avatar = userData.name.substring(0, 1).toUpperCase();
        return userRepository.create(userData);
    }

    static async updateUser(id, userData) {
        return userRepository.update(id, userData);
    }

    static async deleteUser(id) {
        return userRepository.delete(id);
    }

    static async getUserByUid(uid) {
        return userRepository.getUserByUid(uid);
    }

    static async uploadUserProfilePicture(uid, file) {
        // Aquí podrías agregar validaciones adicionales si es necesario
        const publicUrl = await fileUpload("profile_photos/", file);
        return userRepository.updateUserProfilePicture(uid, publicUrl);
    }

    static async getMe(uid) {
        return userRepository.getMe(uid);
    }

    static async updateMe(uid, data) {
        return userRepository.updateMe(uid, data);
    }

    static async associateToHydroponic(hydroponicId, uid) {
        const hydroponic = await hydroponicsRepository.associateUserToHydroponic(hydroponicId, uid);
        return hydroponic;
    }
}

module.exports = UserService;
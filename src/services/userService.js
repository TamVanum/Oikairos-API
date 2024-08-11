const UserRepository = require('../repositories/userRepository.js');

const userRepository = new UserRepository()

const users = [];

class UserService {
    static async getAllUsers() {
        return userRepository.getAll();
    }

    static async getUserById(id) {
        return userRepository.getById(id);
    }

    static async createUser(userData) {
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
        return userRepository.updateUserProfilePicture(uid, file);
    }
}

module.exports = UserService;
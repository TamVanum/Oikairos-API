const UserRepository = require('../repositories/userRepository.js');
const HydroponicsRepository = require('../../hydroponic/repository.js');
const fileUpload = require('../../utils/fileService.js');
const PlanService = require('../../plans/services.js');
const userRepository = new UserRepository()
const hydroponicsRepository = new HydroponicsRepository()


class UserService {
    static async getAllUsers() {
        return userRepository.getAll();
    }

    static async getAllUsersWithPlanData() {
        const users = await userRepository.getAll();

        for (const user of users) {
            try {
                const planSet = await PlanService.getPlanById(user.plan);
                const plan_data = await PlanService.formatPlanDataOnlyUtilData(planSet);
                user.plan = plan_data;
            } catch (error) {
                console.error(`Error processing user ${user.id}:`, error);
            }
        }

        return users;
    }

    static async getUserById(id) {
        return userRepository.getById(id);
    }

    static async createUser(userData) {
        userData.created_at = new Date();
        userData.avatar = userData.name.substring(0, 1).toUpperCase();
        userData.isActibe = true;
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
        const user = await userRepository.getMe(uid);
        try {
            const planSet = await PlanService.getPlanById(user.plan);
            const plan_data = await PlanService.formatPlanDataOnlyUtilData(planSet);
            user.plan = plan_data;
        } catch (error) {
            console.error(`Error processing user ${user.id}:`, error);
        }
        return user;
    }

    static async getHydroponicCount(uid) {
        const hydroponic_count = hydroponicsRepository.getCountHydroponicByUserIdInArray(uid)
        return hydroponic_count;
    }


    static async updateMe(uid, data) {
        return userRepository.updateMe(uid, data);
    }

    static async validateHydroponicCapacityiByPlan(uid) {
        const hyidroponicQuantity = await hydroponicsRepository.getCountHydroponicByUserIdInArray(uid)
        const user = await userRepository.getMe(uid);
        const planSet = await PlanService.getPlanById(user.plan);
        if (hyidroponicQuantity >= planSet.hydroponicCapacity) {
            throw new Error('Max capacity of hydroponics reached');
        }
        return true
    }

    static async validateHydroponicAlreadyAsoiatedToUser(hydroponicId, uid) {
        const hydroponic = await hydroponicsRepository.getById(hydroponicId);
        if (hydroponic.users.includes(uid)) {
            throw new Error('User already associated to hydroponic');
        }
        return hydroponic
    }

    static async associateToHydroponic(hydroponicId, uid) {
        const hydroponic = await hydroponicsRepository.getById(hydroponicId);

        if (hydroponic.users.includes(uid)) {
            throw new Error('User already associated to hydroponic');
        }
        hydroponic.users.push(uid);
        const hydroponicUpdated = await hydroponicsRepository.update(hydroponicId, hydroponic);
        return hydroponicUpdated;
    }
}

module.exports = UserService;
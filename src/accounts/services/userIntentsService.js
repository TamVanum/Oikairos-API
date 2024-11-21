const PlanService = require("../../plans/services");
const UserIntentsRepository = require("../repositories/userIntentsRepository");

const userIntentsRepository = new UserIntentsRepository();

class UserIntentsService {

    static async getAllUserIntents() {  
        return userIntentsRepository.getAll();
    }

    static async getUserIntentById(id) {
        return userIntentsRepository.getById(id);
    }

    static async createUserIntent(userData) {
        const planSet = await PlanService.getPlantByTag(userData.plan);
        const plan = planSet[0];
        const plan_data = await PlanService.formatPlanDataOnlyUtilData(plan);
        console.log(plan_data)
        userData.plan = plan;
        return userIntentsRepository.create(userData);
    }

    static async updateUserIntent(id, userData) {
        return userIntentsRepository.update(id, userData);
    }

    static async deleteUserIntent(id) {
        return userIntentsRepository.delete(id);
    }
}

module.exports = UserIntentsService;
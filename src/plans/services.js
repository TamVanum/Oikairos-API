const PlanRepository = require('./repository.js');

const planRepository = new PlanRepository()

class PlanService {
    static async getAllPlans() {
        return planRepository.getAll();
    }

    static async getPlantByTag(tag){
        return planRepository.getPlantByTag(tag)
    }

    static async getPlanById(id) {
        return planRepository.getById(id);
    }

    static async createPlan(userData) {
        userData.created_at = new Date();
        userData.status = 'pending';
        return planRepository.create(userData);
    }

    static async updatePlan(id, userData) {
        return planRepository.update(id, userData);
    }

    static async deletePlan(id) {
        return planRepository.delete(id);
    }

    static async formatPlanDataOnlyUtilData(plan){
        delete plan.items
        delete plan.callToAction
        delete plan.hasRibbon
        delete plan.ribbonTitle
        delete plan.created_at
        return plan
    }

}

module.exports = PlanService;
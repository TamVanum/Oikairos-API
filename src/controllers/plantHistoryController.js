const PlantHistoryService = require('../services/plantHistoryService.js');

class PlantHistoryController {
    static async getAllPlantHistories(req, res) {
        try {
            const plantHistories = await PlantHistoryService.getAllPlantHistories();
            res.json(plantHistories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getPlantHistoryById(req, res) {
        try {
            const plantHistory = await PlantHistoryService.getPlantHistoryById(req.params.id);
            res.json(plantHistory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createPlantHistory(req, res) {
        try {
            const plantHistory = await PlantHistoryService.createPlantHistory(req.body);
            res.status(201).json(plantHistory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updatePlantHistory(req, res) {
        try {
            const plantHistory = await PlantHistoryService.updatePlantHistory(req.params.id, req.body);
            res.json(plantHistory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deletePlantHistory(req, res) {
        try {
            await PlantHistoryService.deletePlantHistory(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async startNewPlantHistoryCicle(req, res) {
        try {
            const plantHistory = await PlantHistoryService.startNewPlantHistoryCicle(req.body.hydroponicId);
            res.status(201).json(plantHistory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PlantHistoryController;

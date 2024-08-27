const HydroponicsService = require('../services/hydroponicsService.js');

class HydroponicsController {
    static async getAllHydroponics(req, res) {
        try {
            const hydroponics = await HydroponicsService.getAllHydroponics();
            res.json(hydroponics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getHydroponicById(req, res) {
        try {
            const hydroponic = await HydroponicsService.getHydroponicById(req.params.id);
            res.json(hydroponic);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createHydroponic(req, res) {
        try {
            const hydroponic = await HydroponicsService.createHydroponic(req.body);
            res.status(201).json(hydroponic);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateHydroponic(req, res) {
        try {
            const hydroponic = await HydroponicsService.updateHydroponic(req.params.id, req.body);
            res.json(hydroponic);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteHydroponic(req, res) {
        try {
            await HydroponicsService.deleteHydroponic(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = HydroponicsController;

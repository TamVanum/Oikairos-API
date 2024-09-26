const HydroponicsService = require('../services/hydroponicsService.js');
const PlantHistoryService = require('../services/plantHistoryService.js');

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

    static async getHydroponicByUserId(req, res) {
        try {
            const hydroponics = await HydroponicsService.getHydroponicByUserId(req.params.userId);
            res.json(hydroponics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getHydroponicsWithPlantsByUserId(req, res) {
        try {
            const hydroponics = await HydroponicsService.getHydroponicsWithPlantsByUserId(req.params.userId);
            res.json(hydroponics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getHydroponicMetricsInUse(req, res) {
        try {
            const hydroponicMetrics = await HydroponicsService.getHydroponicMetricsInUse(req.params.hydroponicId);
            res.json(hydroponicMetrics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getHydroponicByUserIdInArray(req, res) {
        try {
            const hydroponics = await HydroponicsService.getHydroponicByUserIdInArrayWithoutUsersData(req.user.uid);
            res.json(hydroponics);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updatePlantHistoryRoomId(req, res) {
        const { deviceId, roomId } = req.body;

        if (!deviceId) {
            return res.status(400).json({ error: 'deviceId and roomId are required' });
        }

        try {
            await HydroponicsService.updatePlantHistoryRoomId(deviceId, roomId);
            return res.status(200).json({ message: `Room ID ${roomId} sent to device ${deviceId}` });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async startNewPlantHistoryCicle(req, res) {
        try {
            const plantHistory = await HydroponicsService.startNewPlantHistoryCicle(req.body.hydroponicId);
            res.status(201).json(plantHistory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async endPlantHistoryCicle(req, res) {
        try {
            const plantHistory = await HydroponicsService.endPlantHistoryCicle(req.body.hydroponicId);
            res.status(201).json(plantHistory);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = HydroponicsController;

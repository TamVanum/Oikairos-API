const PlantMetricSnapshotService = require('../services/plantMetricSnapshotService.js');

class PlantMetricSnapshotController {
    static async getAllPlantMetricSnapshots(req, res) {
        try {
            const plantMetricSnapshots = await PlantMetricSnapshotService.getAllPlantMetricSnapshots();
            res.json(plantMetricSnapshots);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getPlantMetricSnapshotById(req, res) {
        try {
            const plantMetricSnapshot = await PlantMetricSnapshotService.getPlantMetricSnapshotById(req.params.id);
            res.json(plantMetricSnapshot);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createPlantMetricSnapshot(req, res) {
        try {
            const plantMetricSnapshot = await PlantMetricSnapshotService.createPlantMetricSnapshot(req.body);
            res.status(201).json(plantMetricSnapshot);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updatePlantMetricSnapshot(req, res) {
        try {
            const plantMetricSnapshot = await PlantMetricSnapshotService.updatePlantMetricSnapshot(req.params.id, req.body);
            res.json(plantMetricSnapshot);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deletePlantMetricSnapshot(req, res) {
        try {
            await PlantMetricSnapshotService.deletePlantMetricSnapshot(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = PlantMetricSnapshotController;

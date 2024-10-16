const UserIntentsService = require("../services/userIntentsService");

class UserIntentController {

    static async getAllUserIntents(req, res) {
        try {
            const userIntents = await UserIntentsService.getAllUserIntents();
            res.json(userIntents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserIntentById(req, res) {
        try {
            const userIntent = await UserIntentsService.getUserIntentById(req.params.id);
            res.json(userIntent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createUserIntent(req, res) {
        try {
            const userIntent = await UserIntentsService.createUserIntent(req.body);
            res.status(201).json(userIntent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUserIntent(req, res) {
        try {
            const userIntent = await UserIntentsService.updateUserIntent(req.params.id, req.body);
            res.json(userIntent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUserIntent(req, res) {
        try {
            await UserIntentsService.deleteUserIntent(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserIntentController;
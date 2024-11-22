const sendMail = require("../../utils/sendMail");
const UserIntentsService = require("../services/userIntentsService");
const fs = require("fs");
const path = require("path");

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

    static async getUserIntentWithJustPlanIdById(req, res) {
        try {
            const userIntent = await UserIntentsService.getUserIntentById(req.params.id);
            userIntent.plan = userIntent.plan.id 
            res.json(userIntent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createUserIntent(req, res) {
        try {
            if (req.body.disclaimer) {
                delete req.body.disclaimer;
            }
            req.body.status = "pending";
            const userIntent = await UserIntentsService.createUserIntent(req.body);
            // res.status(201).json(userIntent);
            res.redirect('http://localhost:4321/petition-sended')
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

    static async sendCreationMail(req, res) {
        try {
            const { email, userIntentId } = req.body;
            const frontUrl = process.env.FRONT_END_URL;
            if (!email) {
                return res.status(400).json({ message: 'Email is required.' });
            }
            const confirmationLink = `${frontUrl}confirmation-account/${userIntentId}`;
            const templatePath = path.join(__dirname, '../templates/confirmation_account.html');
            const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
            const customizedTemplate = htmlTemplate.replace(/{{ confirmationLink }}/g, confirmationLink);
            await sendMail(email, 'Confirma tu Cuenta', customizedTemplate);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error in sendCreationMail:', error);
            res.status(500).json({ error: 'Failed to send email' });
        }
    }
}

module.exports = UserIntentController;
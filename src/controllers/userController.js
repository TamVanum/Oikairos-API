const UserService = require('../services/userService.js');
const sendEmail = require('../utils/sendEmail.js');

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            // quitar el comentario para enviar el correo
            // sendEmail([user.email], 'Bienvenido', 'Gracias por registrarte en nuestra plataforma');

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserController;
const UserService = require('../services/userService.js');
// const sendEmailMailerSend = require('../utils/sendEmailMailerSend.js');
const AuthService = require('../services/authService.js');
const PlantsMetricsService = require('../../plantMetrics/services.js');

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
            const authUser = await AuthService.createUser(req.body.email, req.body.password);
            req.body.auth_uid = authUser.uid;
            delete req.body.password;
            const user = await UserService.createUser(req.body);
            // quitar el comentario para enviar el correo
            // sendEmailMailerSend([user.email], 'Bienvenido', 'Gracias por registrarte en nuestra plataforma', "sadasdas");
            const create_default_metric = await PlantsMetricsService.createDefaultMetric(user.auth_uid);
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

    static async getUserByUid(req, res) {
        try {
            const user = await UserService.getUserByUid(req.body.uid);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async uploadProfilePicture(req, res) {
        try {
            const uid = req.user.uid;
            const file = req.file;

            if (!file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const profileImgUrl = await UserService.uploadUserProfilePicture(uid, file);

            res.status(200).json({ message: 'Foto de perfil de usario actualizada correctamnete', user: profileImgUrl });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getMe(req, res) {
        try {
            const uid = req.user.uid;
            const user = await UserService.getMe(uid);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateMe(req, res) {
        try {
            const uid = req.user.uid
            const data = req.body;

            const user = await UserService.updateMe(uid, data);

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async associateToHydroponic(req, res) {
        try {
            const hydroponicId = req.body.hydroponicId;
            const uid = req.user.uid;

            const hydroponic = await UserService.associateToHydroponic(hydroponicId, uid);

            res.status(200).json(hydroponic);
        } catch (error) {
            if (error.message === 'User already associated to hydroponic') {
                // Retorna un 409 Conflict si el usuario ya está asociado al hidropónico
                res.status(409).json({ error: error.message });
            } else {
                // Manejo de otros errores
                res.status(500).json({ error: error.message });
            }
        }
    }

}

module.exports = UserController;
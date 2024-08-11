const AuthService = require('../services/authService.js');
const { auth } = require('../utils/firebase.js');

class AuthController {
    static async signIn(req, res) {
        const { email, password } = req.body;
        try {
            const token = await AuthService.signInWithEmailAndPassword(email, password);
            res.json({ token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    }

    static async createUser(req, res) {
        const { email, password } = req.body;
        try {
            // Crear el usuario
            const userRecord = await AuthService.createUser(email, password);

            res.status(201).json(userRecord);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }



    static async sendPasswordResetEmail(req, res) {
        const { email } = req.body;
        try {
            const link = await auth.generatePasswordResetLink(email, {
                url: 'http://localhost:3000/reset-password',
                // url: 'https://your-website.com/reset-password',
            });
            console.log("Password reset link sent:", link);
            res.json({ message: 'Password reset link sent' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AuthController;

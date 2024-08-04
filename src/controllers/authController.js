const AuthService = require('../services/authService.js');
const {auth} = require('../utils/firebase.js');

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
}

module.exports = AuthController;

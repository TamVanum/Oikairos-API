const { auth } = require('../config/firebase');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/sendMail');

class AuthService {

    static async signInWithEmailAndPassword(email, password) {
        try {
            // 1. Obtener el usuario por su correo electrónico
            const userRecord = await auth.getUserByEmail(email);
            const uid = userRecord.uid;
            // 2. Verificar la contraseña usando Firebase Admin SDK (No necesitas verificar la contraseña manualmente)
            // Firebase Admin SDK no proporciona un método directo para verificar la contraseña.
            // La verificación de la contraseña generalmente se maneja directamente en el cliente (en tu frontend).

            // 3. Crear un token personalizado válido por una hora
            // const customToken = await auth.createCustomToken(uid);
            const customToken = await auth.createCustomToken(uid);

            return customToken;
        } catch (error) {
            console.error('Authentication failed:', error);
            throw new Error('Authentication failed');
        }
    }


    static async createUser(email, password) {
        try {
            // 1. Crear un nuevo usuario con correo electrónico y contraseña
            const userRecord = await auth.createUser({
                email,
                password,
            });

            const emailVerificationLink = await auth.generateEmailVerificationLink(email, {
                url: 'http://localhost:3000/email-verification',
                // url: 'https://your-website.com/email-verification',
            });

            sendMail(email, 'Bienvenido', emailVerificationLink);

            console.log("Email verification link sent:", emailVerificationLink);

            return userRecord;
        } catch (error) {
            console.error('AuthService createUser - Error creating new user:', error);
            throw error;
        }
    }

}

module.exports = AuthService;
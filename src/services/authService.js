const { auth } = require('../utils/firebase');
const jwt = require('jsonwebtoken');

async function signInWithEmailAndPassword(email, password) {
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


async function signInWithEmailAndPasswordJWT(email, password) {
    try {
        // Obtener el usuario por su correo electrónico
        const userRecord = await auth.getUserByEmail(email);
        const uid = userRecord.uid;
        
        // Generar un token JWT válido por una hora
        const token = jwt.sign({ uid }, 'secret_key', { expiresIn: '1h' });
        
        return token;
    } catch (error) {
        console.error('Authentication failed:', error);
        throw new Error('Authentication failed');
    }
}


module.exports = { signInWithEmailAndPassword, signInWithEmailAndPasswordJWT };
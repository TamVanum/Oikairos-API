// const jwt = require('jsonwebtoken');
// const { auth } = require('../utils/firestore');

// const authMiddleware = async (req, res, next) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         // Verificar y decodificar el token JWT
//         const decodedToken = jwt.verify(token, 'secret_key');
//         const decodedToken2 = auth.verifyIdToken(token);
//         console.log(decodedToken2);
//         // Verificar si el UID del token decodificado coincide con el UID del usuario necesario para la autorización
//         // if (decodedToken.uid !== 'w43A4hDR6OZBRsBIfQly281QPRf1') { // Reemplaza con el UID adecuado
//         //     return res.status(403).json({ message: 'Unauthorized' });
//         // }

//         req.user = decodedToken; // Asignar los datos decodificados a req.user
//         next();
//     } catch (error) {
//         console.error('Invalid token:', error);
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

// module.exports = authMiddleware;

const { auth } = require('../utils/firebase');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        console.log(decodedToken.uid);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

module.exports = authMiddleware;
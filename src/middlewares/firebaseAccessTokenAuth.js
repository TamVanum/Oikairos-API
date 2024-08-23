

const { auth } = require('../config/firebase');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        
        next();
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
};

module.exports = authMiddleware;
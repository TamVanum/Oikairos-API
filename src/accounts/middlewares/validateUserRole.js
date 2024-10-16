const UserService = require('../services/userService.js');

const validateUserRole = async (req, res, next) => {
    const uid = req.user.uid;
    const user = await UserService.getMe(uid);
    if (!user.isAdmin) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
}


module.exports = validateUserRole;
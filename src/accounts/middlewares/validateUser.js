const { body, validationResult } = require('express-validator');

const validateUser = [
    body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
    body('email').isEmail().withMessage('Email is required and must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password is required and must be at least 6 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;
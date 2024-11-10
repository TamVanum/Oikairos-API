const { body, validationResult } = require('express-validator');

const validateUser = [
    body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
    body('lastname').isString().notEmpty().withMessage('Lastname is required and must be a string'),
    body('email').isEmail().withMessage('Email is required and must be valid'),
    body('phone').isString().withMessage('Phone is required and must be valid'),
    body('plan').isInt().withMessage('Plan is required and must be valid'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;
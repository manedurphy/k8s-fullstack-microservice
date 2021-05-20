const { body } = require('express-validator');
const validationResponses = require('../constants/validationResponses');

module.exports = [body('id').notEmpty().withMessage(validationResponses.delete)];

const { body } = require('express-validator');
const validationResponses = require('../constants/validationResponses');
const createReviewRequirements = require('./createReviewValidation');

module.exports = [...createReviewRequirements, body('id').notEmpty().withMessage(validationResponses.update)];

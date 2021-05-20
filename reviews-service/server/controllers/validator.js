const { validationResult } = require('express-validator');

class Validator {
    constructor(req) {
        this.validation = validationResult(req);
        this.error = this.getErrors();
    }

    getErrorsPresent() {
        return !this.validation.isEmpty();
    }

    getErrors() {
        if (this.getErrorsPresent()) return new ValidationError(this.validation.array());
    }
}

class ValidationError {
    constructor(error) {
        this.error = error;
    }
}

module.exports = Validator;

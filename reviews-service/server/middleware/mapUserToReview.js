const httpResponses = require('../constants/httpResponses');

module.exports = (req, res, next) => {
    if (!req.headers['user_id']) return res.status(400).json({ message: httpResponses.notLoggedIn });
    req.body.user_id = req.headers['user_id'];
    next();
};

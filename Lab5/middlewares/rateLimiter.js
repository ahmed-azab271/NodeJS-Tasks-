const { rateLimit } = require('express-rate-limit');
const APIError = require('../helpers/APIError');


const limiter = rateLimit(
{
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
    handler: (req, res, next) => {
        throw new APIError("Too many requests, please try again later.", 429)
    }
})

module.exports = limiter;

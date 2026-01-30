const Joi = require('joi');

const donateBodySchema = Joi.object(
{
    amount: Joi.number().min(5).required(),
}).required();

const donateSchema = 
{
    body: donateBodySchema,
}

module.exports = donateSchema;

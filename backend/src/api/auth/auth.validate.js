/* eslint-disable no-param-reassign */
const Joi = require('@hapi/joi');
const { schemaValidator } = require('../../common/schema-validator/utils');

const loginSchema = Joi.object({
    username: Joi.string().min(1).max(255).required(),
    password: Joi.string().min(1).max(255).required(),
}).unknown(true);

module.exports = {
    // Use for login
    validateLogin: function (req, res, next) {
        try {
            schemaValidator(loginSchema, req.body);

            next();
        } catch (err) {
            next(err);
        }
    },
};

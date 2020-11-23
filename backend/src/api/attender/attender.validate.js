/* eslint-disable no-param-reassign */
const Joi = require('@hapi/joi');
const { schemaValidator } = require('../../common/schema-validator/utils');

const checkInOutSchema = Joi.object({
    identity: Joi.string().min(1).max(255).required(),
}).unknown(true);

module.exports = {
    // Use for login
    validateCheckInOut: function (req, res, next) {
        try {
            schemaValidator(checkInOutSchema, req.body);

            next();
        } catch (err) {
            next(err);
        }
    },
};

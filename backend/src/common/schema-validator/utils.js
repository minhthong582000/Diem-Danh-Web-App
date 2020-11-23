/* eslint-disable no-param-reassign */
const AppError = require('../error/error');
const { httpStatus } = require('../error/http-status');

function schemaValidator(joiSchema, data) {
    const result = joiSchema.validate(data, {
        abortEarly: false,
    });

    const errors = result.error
        ? result.error.details.map((err) => {
              // Its doesn't nessesary to show error's type or context

              if (
                  err.type === 'string.pattern.base' &&
                  (err.path.includes('password') ||
                      err.path.includes('newPassword'))
              ) {
                  err.message = 'Password too weak.';
                  err.type = 'password.weak';

                  delete err.context;

                  return err;
              }

              delete err.context;

              return err;
          })
        : [];

    if (errors.length > 0) {
        throw new AppError(httpStatus.BAD_REQUEST, errors, true);
    }
}

module.exports.schemaValidator = schemaValidator;

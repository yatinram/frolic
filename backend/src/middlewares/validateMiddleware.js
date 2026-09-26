const { errorResponse } = require('../utils/responseFormatter');

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const formattedErrors = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/['"]/g, ''),
      }));
      return errorResponse(res, 'Validation error', 422, formattedErrors);
    }

    req[property] = value;
    next();
  };
};

module.exports = validate;

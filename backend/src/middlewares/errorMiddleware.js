const logger = require('../utils/logger');
const { errorResponse } = require('../utils/responseFormatter');
const config = require('../config/env');

const errorHandler = (err, req, res, next) => {
  logger.error(`[${req.method}] ${req.originalUrl} >> Error: ${err.message}`, { stack: err.stack });

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return errorResponse(res, 'Database validation error', 422, errors);
  }

  const statusCode = err.statusCode || 500;
  const message = config.NODE_ENV === 'production' && statusCode === 500
    ? 'Internal server error occurred. Please try again later.'
    : err.message || 'Internal server error';

  return errorResponse(res, message, statusCode);
};

module.exports = errorHandler;

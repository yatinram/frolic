const jwt = require('jsonwebtoken');
const config = require('../config/env');
const { errorResponse } = require('../utils/responseFormatter');
const { AdminUser } = require('../models');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication required. Token missing.', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await AdminUser.findByPk(decoded.id);
    if (!user || !user.isActive) {
      return errorResponse(res, 'Invalid token or inactive user account.', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Session token has expired. Please login again.', 401);
    }
    return errorResponse(res, 'Invalid authentication token.', 401);
  }
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Unauthorized access', 401);
    }
    if (roles.length && !roles.includes(req.user.role)) {
      return errorResponse(res, 'Forbidden. Insufficient privileges.', 403);
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
  protect: authenticate,
  requireAuth: authenticate,
};

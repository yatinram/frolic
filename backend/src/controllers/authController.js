const jwt = require('jsonwebtoken');
const { AdminUser } = require('../models');
const config = require('../config/env');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');
const { Op } = require('sequelize');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await AdminUser.findOne({
      where: {
        [Op.or]: [
          { email: email.toLowerCase() },
          { name: email },
        ],
      },
    });

    if (!user) {
      logger.warn(`[AUTH FAILED] Login attempt with unknown identifier: ${email}`);
      return errorResponse(res, 'Invalid email/username or password', 401);
    }

    if (!user.isActive) {
      return errorResponse(res, 'Account is deactivated. Contact administrator.', 403);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn(`[AUTH FAILED] Password mismatch for user: ${email}`);
      return errorResponse(res, 'Invalid email/username or password', 401);
    }

    user.lastLogin = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN }
    );

    logger.info(`[AUTH SUCCESS] User '${user.name}' (${user.email}) logged in successfully.`);

    return successResponse(res, {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    return successResponse(res, {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      lastLogin: user.lastLogin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getMe,
};

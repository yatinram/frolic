const { FranchiseEnquiry } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const { sendFranchiseNotification } = require('../services/notificationService');
const { Op } = require('sequelize');

const createFranchiseEnquiry = async (req, res, next) => {
  try {
    const franchise = await FranchiseEnquiry.create(req.body);
    sendFranchiseNotification(franchise).catch(() => {});

    return successResponse(
      res,
      franchise,
      'Thank you for your interest in partnering with Frolic Kids Edu Labs! Our business expansion team will contact you soon.',
      201
    );
  } catch (error) {
    next(error);
  }
};

const getFranchiseEnquiries = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const { status, city, search } = req.query;

    const where = {};
    if (status) where.status = status;
    if (city) where.city = { [Op.like]: `%${city}%` };
    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { city: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await FranchiseEnquiry.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return successResponse(res, {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      enquiries: rows,
    });
  } catch (error) {
    next(error);
  }
};

const updateFranchiseStatus = async (req, res, next) => {
  try {
    const enquiry = await FranchiseEnquiry.findByPk(req.params.id);
    if (!enquiry) {
      return errorResponse(res, 'Franchise enquiry not found', 404);
    }
    await enquiry.update(req.body);
    return successResponse(res, enquiry, 'Franchise enquiry status updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteFranchiseEnquiry = async (req, res, next) => {
  try {
    const enquiry = await FranchiseEnquiry.findByPk(req.params.id);
    if (!enquiry) {
      return errorResponse(res, 'Franchise enquiry not found', 404);
    }
    await enquiry.destroy();
    return successResponse(res, null, 'Franchise enquiry deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createFranchiseEnquiry,
  getFranchiseEnquiries,
  updateFranchiseStatus,
  deleteFranchiseEnquiry,
};

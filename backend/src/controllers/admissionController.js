const { Admission } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const { sendAdmissionNotification } = require('../services/notificationService');
const { Op } = require('sequelize');

const createAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.create(req.body);
    // Trigger notification asynchronously
    sendAdmissionNotification(admission).catch(() => {});

    return successResponse(
      res,
      admission,
      'Thank you! Your admission enquiry has been received. Our team will contact you shortly.',
      201
    );
  } catch (error) {
    next(error);
  }
};

const getAdmissions = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const { status, program, search } = req.query;

    const where = {};
    if (status) where.status = status;
    if (program) where.program = program;
    if (search) {
      where[Op.or] = [
        { childName: { [Op.like]: `%${search}%` } },
        { parentName: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Admission.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return successResponse(res, {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      admissions: rows,
    });
  } catch (error) {
    next(error);
  }
};

const getAdmissionById = async (req, res, next) => {
  try {
    const admission = await Admission.findByPk(req.params.id);
    if (!admission) {
      return errorResponse(res, 'Admission enquiry not found', 404);
    }
    return successResponse(res, admission);
  } catch (error) {
    next(error);
  }
};

const updateAdmissionStatus = async (req, res, next) => {
  try {
    const admission = await Admission.findByPk(req.params.id);
    if (!admission) {
      return errorResponse(res, 'Admission enquiry not found', 404);
    }

    await admission.update(req.body);
    return successResponse(res, admission, 'Admission status updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteAdmission = async (req, res, next) => {
  try {
    const admission = await Admission.findByPk(req.params.id);
    if (!admission) {
      return errorResponse(res, 'Admission enquiry not found', 404);
    }
    await admission.destroy();
    return successResponse(res, null, 'Admission enquiry deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAdmission,
  getAdmissions,
  getAdmissionById,
  updateAdmissionStatus,
  deleteAdmission,
};

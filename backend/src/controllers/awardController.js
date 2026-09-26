const { Award } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// GET /api/awards (Public List)
const getAwards = async (req, res, next) => {
  try {
    const { activeOnly = 'true' } = req.query;
    const where = {};
    if (activeOnly === 'true') where.isActive = true;

    const awards = await Award.findAll({
      where,
      order: [['sortOrder', 'ASC'], ['year', 'DESC']],
    });

    return successResponse(res, awards, `Fetched ${awards.length} awards`);
  } catch (err) {
    next(err);
  }
};

// POST /api/awards (Admin Create)
const createAward = async (req, res, next) => {
  try {
    const award = await Award.create(req.body);
    return successResponse(res, award, 'Award created successfully', 201);
  } catch (err) {
    next(err);
  }
};

// PUT /api/awards/:id (Admin Update)
const updateAward = async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await Award.findByPk(id);
    if (!award) return errorResponse(res, 'Award not found', 404);
    await award.update(req.body);
    return successResponse(res, award, 'Award updated successfully');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/awards/:id (Admin Delete)
const deleteAward = async (req, res, next) => {
  try {
    const { id } = req.params;
    const award = await Award.findByPk(id);
    if (!award) return errorResponse(res, 'Award not found', 404);
    await award.destroy();
    return successResponse(res, null, 'Award deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAwards,
  createAward,
  updateAward,
  deleteAward,
};

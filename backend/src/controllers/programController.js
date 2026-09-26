const { Program } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const { Op } = require('sequelize');

const getPrograms = async (req, res, next) => {
  try {
    const { category, activeOnly } = req.query;
    const where = {};
    if (category) where.category = category;
    if (activeOnly !== 'false') where.isActive = true;

    const programs = await Program.findAll({
      where,
      order: [['sortOrder', 'ASC'], ['id', 'ASC']],
    });

    return successResponse(res, programs);
  } catch (error) {
    next(error);
  }
};

const getProgramBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const isId = !isNaN(slug);

    const program = await Program.findOne({
      where: isId
        ? { [Op.or]: [{ slug }, { id: parseInt(slug, 10) }] }
        : { slug },
    });

    if (!program) {
      return errorResponse(res, 'Program not found', 404);
    }
    return successResponse(res, program);
  } catch (error) {
    next(error);
  }
};

const createProgram = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.name && data.title) data.name = data.title;
    if (!data.title && data.name) data.title = data.name;

    const program = await Program.create(data);
    return successResponse(res, program, 'Program created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateProgram = async (req, res, next) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return errorResponse(res, 'Program not found', 404);
    }
    const data = { ...req.body };
    if (!data.name && data.title) data.name = data.title;
    if (!data.title && data.name) data.title = data.name;

    await program.update(data);
    return successResponse(res, program, 'Program updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteProgram = async (req, res, next) => {
  try {
    const program = await Program.findByPk(req.params.id);
    if (!program) {
      return errorResponse(res, 'Program not found', 404);
    }
    await program.destroy();
    return successResponse(res, null, 'Program deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPrograms,
  getProgramBySlug,
  createProgram,
  updateProgram,
  deleteProgram,
};

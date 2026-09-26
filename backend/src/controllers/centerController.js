const { Center } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const { Op } = require('sequelize');

// GET /api/centers (with filtering by state, district, city, taluka, search query)
const getCenters = async (req, res, next) => {
  try {
    const { state, district, city, taluka, search, activeOnly = 'true' } = req.query;
    const where = {};

    if (activeOnly === 'true') {
      where.isActive = true;
    }

    if (state && state !== 'All') {
      where.state = state;
    }

    if (district && district !== 'All') {
      where[Op.or] = [
        { district: district },
        { city: district },
      ];
    }

    if (city && city !== 'All') {
      where.city = city;
    }

    if (taluka && taluka !== 'All') {
      where.taluka = taluka;
    }

    if (search && search.trim()) {
      const q = `%${search.trim()}%`;
      where[Op.or] = [
        { name: { [Op.like]: q } },
        { area: { [Op.like]: q } },
        { city: { [Op.like]: q } },
        { district: { [Op.like]: q } },
        { taluka: { [Op.like]: q } },
        { state: { [Op.like]: q } },
        { pincode: { [Op.like]: q } },
        { address: { [Op.like]: q } },
      ];
    }

    const centers = await Center.findAll({
      where,
      order: [
        ['isFlagship', 'DESC'],
        ['state', 'ASC'],
        ['district', 'ASC'],
        ['city', 'ASC'],
        ['name', 'ASC'],
      ],
    });

    return successResponse(res, centers, `Found ${centers.length} centres matching criteria`);
  } catch (err) {
    next(err);
  }
};

// GET /api/centers/locations (grouped states, districts, and talukas hierarchy)
const getLocationHierarchy = async (req, res, next) => {
  try {
    const centers = await Center.findAll({
      where: { isActive: true },
      attributes: ['state', 'district', 'city', 'taluka'],
      order: [['state', 'ASC'], ['district', 'ASC'], ['city', 'ASC']],
    });

    // Structure: { [state]: { [district]: [talukas...] } }
    const hierarchy = {};
    centers.forEach(({ state, district, city, taluka }) => {
      if (!state) return;
      if (!hierarchy[state]) {
        hierarchy[state] = {};
      }
      const dist = district || city;
      if (dist) {
        if (!hierarchy[state][dist]) {
          hierarchy[state][dist] = [];
        }
        if (taluka && !hierarchy[state][dist].includes(taluka)) {
          hierarchy[state][dist].push(taluka);
        }
      }
    });

    return successResponse(res, hierarchy, 'Location hierarchy fetched successfully');
  } catch (err) {
    next(err);
  }
};

// GET /api/centers/:slug
const getCenterBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const center = await Center.findOne({
      where: { slug, isActive: true },
    });

    if (!center) {
      return errorResponse(res, 'Centre not found', 404);
    }

    return successResponse(res, center, 'Centre details fetched');
  } catch (err) {
    next(err);
  }
};

// POST /api/centers (Admin create)
const createCenter = async (req, res, next) => {
  try {
    const newCenter = await Center.create(req.body);
    return successResponse(res, newCenter, 'Centre created successfully', 201);
  } catch (err) {
    next(err);
  }
};

// PUT /api/centers/:id (Admin update)
const updateCenter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const center = await Center.findByPk(id);
    if (!center) {
      return errorResponse(res, 'Centre not found', 404);
    }
    await center.update(req.body);
    return successResponse(res, center, 'Centre updated successfully');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/centers/:id (Admin delete)
const deleteCenter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const center = await Center.findByPk(id);
    if (!center) {
      return errorResponse(res, 'Centre not found', 404);
    }
    await center.destroy();
    return successResponse(res, null, 'Centre deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCenters,
  getLocationHierarchy,
  getCenterBySlug,
  createCenter,
  updateCenter,
  deleteCenter,
};

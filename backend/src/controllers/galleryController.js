const { MediaGallery } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const getGallery = async (req, res, next) => {
  try {
    const { category, featuredOnly } = req.query;
    const where = {};
    if (category && category !== 'all') where.category = category;
    if (featuredOnly === 'true') where.isFeatured = true;

    const items = await MediaGallery.findAll({
      where,
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']],
    });

    return successResponse(res, items);
  } catch (error) {
    next(error);
  }
};

const createGalleryItem = async (req, res, next) => {
  try {
    let imageUrl = req.body.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    if (!imageUrl) {
      return errorResponse(res, 'Image or imageUrl is required', 422);
    }

    const item = await MediaGallery.create({
      title: req.body.title,
      imageUrl,
      category: req.body.category || 'activities',
      altText: req.body.altText || req.body.title,
      sortOrder: parseInt(req.body.sortOrder, 10) || 0,
      isFeatured: req.body.isFeatured === 'true' || req.body.isFeatured === true,
    });

    return successResponse(res, item, 'Gallery image added successfully', 201);
  } catch (error) {
    next(error);
  }
};

const deleteGalleryItem = async (req, res, next) => {
  try {
    const item = await MediaGallery.findByPk(req.params.id);
    if (!item) {
      return errorResponse(res, 'Gallery item not found', 404);
    }
    await item.destroy();
    return successResponse(res, null, 'Gallery item deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
};

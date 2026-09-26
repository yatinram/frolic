const { Product } = require('../models');
const { Op } = require('sequelize');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// GET /api/products (with optional category & search filtering)
const getProducts = async (req, res, next) => {
  try {
    const { category, search, activeOnly = 'true' } = req.query;
    const where = {};
    if (activeOnly === 'true') where.isActive = true;
    if (category && category !== 'all') where.category = category;
    if (search && search.trim()) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search.trim()}%` } },
        { description: { [Op.like]: `%${search.trim()}%` } },
      ];
    }

    const products = await Product.findAll({
      where,
      order: [['sortOrder', 'ASC'], ['id', 'ASC']],
    });

    return successResponse(res, products, `Fetched ${products.length} products`);
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:slug
const getProductBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ where: { slug, isActive: true } });
    if (!product) return errorResponse(res, 'Product not found', 404);
    return successResponse(res, product, 'Product details fetched');
  } catch (err) {
    next(err);
  }
};

// POST /api/products (Admin Create)
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return successResponse(res, product, 'Product created successfully', 201);
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id (Admin Update)
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return errorResponse(res, 'Product not found', 404);
    await product.update(req.body);
    return successResponse(res, product, 'Product updated successfully');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id (Admin Delete)
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return errorResponse(res, 'Product not found', 404);
    await product.destroy();
    return successResponse(res, null, 'Product deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
};

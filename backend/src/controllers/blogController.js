const { Blog } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const getBlogs = async (req, res, next) => {
  try {
    const { category, all } = req.query;
    const where = all === 'true' ? {} : { isPublished: true };
    if (category) where.category = category;

    const blogs = await Blog.findAll({
      where,
      order: [['publishedAt', 'DESC']],
    });

    return successResponse(res, blogs);
  } catch (error) {
    next(error);
  }
};

const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ where: { slug: req.params.slug } });
    if (!blog) {
      return errorResponse(res, 'Article not found', 404);
    }
    return successResponse(res, blog);
  } catch (error) {
    next(error);
  }
};

const createBlog = async (req, res, next) => {
  try {
    const blog = await Blog.create(req.body);
    return successResponse(res, blog, 'Article published successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return errorResponse(res, 'Article not found', 404);
    }
    await blog.update(req.body);
    return successResponse(res, blog, 'Article updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return errorResponse(res, 'Article not found', 404);
    }
    await blog.destroy();
    return successResponse(res, null, 'Article deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
};

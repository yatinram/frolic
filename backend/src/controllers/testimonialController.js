const { Testimonial } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

const getTestimonials = async (req, res, next) => {
  try {
    const { all } = req.query;
    const where = all === 'true' ? {} : { isPublished: true };

    const testimonials = await Testimonial.findAll({
      where,
      order: [['sortOrder', 'ASC'], ['createdAt', 'DESC']],
    });

    return successResponse(res, testimonials);
  } catch (error) {
    next(error);
  }
};

const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    return successResponse(res, testimonial, 'Testimonial created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      return errorResponse(res, 'Testimonial not found', 404);
    }
    await testimonial.update(req.body);
    return successResponse(res, testimonial, 'Testimonial updated successfully');
  } catch (error) {
    next(error);
  }
};

const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) {
      return errorResponse(res, 'Testimonial not found', 404);
    }
    await testimonial.destroy();
    return successResponse(res, null, 'Testimonial deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};

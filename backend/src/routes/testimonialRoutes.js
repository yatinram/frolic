const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const validate = require('../middlewares/validateMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { testimonialSchema } = require('../validators/schemas');
const { ROLES } = require('../config/constants');

// Public
router.get('/', testimonialController.getTestimonials);

// Admin
router.post('/', authenticate, validate(testimonialSchema), testimonialController.createTestimonial);
router.put('/:id', authenticate, validate(testimonialSchema), testimonialController.updateTestimonial);
router.delete('/:id', authenticate, authorize([ROLES.SUPER_ADMIN]), testimonialController.deleteTestimonial);

module.exports = router;

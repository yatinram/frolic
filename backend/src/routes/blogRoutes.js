const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const validate = require('../middlewares/validateMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { blogSchema } = require('../validators/schemas');
const { ROLES } = require('../config/constants');

// Public
router.get('/', blogController.getBlogs);
router.get('/:slug', blogController.getBlogBySlug);

// Admin
router.post('/', authenticate, validate(blogSchema), blogController.createBlog);
router.put('/:id', authenticate, validate(blogSchema), blogController.updateBlog);
router.delete('/:id', authenticate, authorize([ROLES.SUPER_ADMIN]), blogController.deleteBlog);

module.exports = router;

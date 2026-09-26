const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const { ROLES } = require('../config/constants');

// Public
router.get('/', galleryController.getGallery);

// Admin
router.post('/', authenticate, upload.single('image'), galleryController.createGalleryItem);
router.delete('/:id', authenticate, authorize([ROLES.SUPER_ADMIN]), galleryController.deleteGalleryItem);

module.exports = router;

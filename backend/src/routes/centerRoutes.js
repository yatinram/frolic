const express = require('express');
const router = express.Router();
const centerController = require('../controllers/centerController');
const { requireAuth } = require('../middlewares/authMiddleware');

// Public routes
router.get('/', centerController.getCenters);
router.get('/locations', centerController.getLocationHierarchy);
router.get('/:slug', centerController.getCenterBySlug);

// Protected admin routes
router.post('/', requireAuth, centerController.createCenter);
router.put('/:id', requireAuth, centerController.updateCenter);
router.delete('/:id', requireAuth, centerController.deleteCenter);

module.exports = router;

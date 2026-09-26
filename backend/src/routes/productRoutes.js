const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { requireAuth } = require('../middlewares/authMiddleware');

// Public
router.get('/', productController.getProducts);
router.get('/:slug', productController.getProductBySlug);

// Admin Protected
router.post('/', requireAuth, productController.createProduct);
router.put('/:id', requireAuth, productController.updateProduct);
router.delete('/:id', requireAuth, productController.deleteProduct);

module.exports = router;

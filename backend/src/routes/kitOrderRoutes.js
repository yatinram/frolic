const express = require('express');
const router = express.Router();
const kitOrderController = require('../controllers/kitOrderController');
const { requireAuth } = require('../middlewares/authMiddleware');

// Public
router.post('/', kitOrderController.createOrder);

// Admin Protected
router.get('/', requireAuth, kitOrderController.getOrders);
router.patch('/:id/status', requireAuth, kitOrderController.updateOrderStatus);
router.delete('/:id', requireAuth, kitOrderController.deleteOrder);

module.exports = router;

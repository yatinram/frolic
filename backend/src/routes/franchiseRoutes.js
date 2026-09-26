const express = require('express');
const router = express.Router();
const franchiseController = require('../controllers/franchiseController');
const validate = require('../middlewares/validateMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { franchiseSchema, updateFranchiseStatusSchema } = require('../validators/schemas');
const { ROLES } = require('../config/constants');

// Public route: submit franchise enquiry
router.post('/', validate(franchiseSchema), franchiseController.createFranchiseEnquiry);

// Protected admin routes
router.get('/', authenticate, franchiseController.getFranchiseEnquiries);
router.patch('/:id/status', authenticate, validate(updateFranchiseStatusSchema), franchiseController.updateFranchiseStatus);
router.delete('/:id', authenticate, authorize([ROLES.SUPER_ADMIN]), franchiseController.deleteFranchiseEnquiry);

module.exports = router;

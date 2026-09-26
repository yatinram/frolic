const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admissionController');
const validate = require('../middlewares/validateMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { admissionSchema, updateAdmissionStatusSchema } = require('../validators/schemas');
const { ROLES } = require('../config/constants');

// Public route: submit enquiry
router.post('/', validate(admissionSchema), admissionController.createAdmission);

// Protected admin routes
router.get('/', authenticate, admissionController.getAdmissions);
router.get('/:id', authenticate, admissionController.getAdmissionById);
router.patch('/:id/status', authenticate, validate(updateAdmissionStatusSchema), admissionController.updateAdmissionStatus);
router.delete('/:id', authenticate, authorize([ROLES.SUPER_ADMIN]), admissionController.deleteAdmission);

module.exports = router;

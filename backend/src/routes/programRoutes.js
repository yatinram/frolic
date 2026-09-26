const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController');
const validate = require('../middlewares/validateMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { programSchema } = require('../validators/schemas');
const { ROLES } = require('../config/constants');

// Public
router.get('/', programController.getPrograms);
router.get('/:slug', programController.getProgramBySlug);

// Admin
router.post('/', authenticate, validate(programSchema), programController.createProgram);
router.put('/:id', authenticate, validate(programSchema), programController.updateProgram);
router.delete('/:id', authenticate, authorize([ROLES.SUPER_ADMIN]), programController.deleteProgram);

module.exports = router;

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const validate = require('../middlewares/validateMiddleware');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const { contactSchema } = require('../validators/schemas');
const { ROLES } = require('../config/constants');

router.post('/', validate(contactSchema), contactController.createContact);
router.get('/', authenticate, contactController.getContacts);
router.delete('/:id', authenticate, authorize([ROLES.SUPER_ADMIN]), contactController.deleteContact);

module.exports = router;

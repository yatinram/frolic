const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validateMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');
const { loginSchema } = require('../validators/schemas');

router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authenticate, authController.getMe);

module.exports = router;

const express = require('express');
const router = express.Router();
const awardController = require('../controllers/awardController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', awardController.getAwards);
router.post('/', protect, awardController.createAward);
router.put('/:id', protect, awardController.updateAward);
router.delete('/:id', protect, awardController.deleteAward);

module.exports = router;

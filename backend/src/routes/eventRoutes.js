const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', eventController.getEvents);
router.get('/:slug', eventController.getEventBySlug);
router.post('/', protect, eventController.createEvent);
router.put('/:id', protect, eventController.updateEvent);
router.delete('/:id', protect, eventController.deleteEvent);

module.exports = router;

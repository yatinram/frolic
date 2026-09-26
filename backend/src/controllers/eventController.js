const { Event } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// GET /api/events (Public List with filter options)
const getEvents = async (req, res, next) => {
  try {
    const { upcoming, activeOnly = 'true' } = req.query;
    const where = {};
    if (activeOnly === 'true') where.isActive = true;
    if (upcoming !== undefined) where.isUpcoming = upcoming === 'true';

    const events = await Event.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });

    return successResponse(res, events, `Fetched ${events.length} events`);
  } catch (err) {
    next(err);
  }
};

// GET /api/events/:slug
const getEventBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ where: { slug, isActive: true } });
    if (!event) return errorResponse(res, 'Event not found', 404);
    return successResponse(res, event, 'Event details fetched');
  } catch (err) {
    next(err);
  }
};

// POST /api/events (Admin Create)
const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    return successResponse(res, event, 'Event created successfully', 201);
  } catch (err) {
    next(err);
  }
};

// PUT /api/events/:id (Admin Update)
const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) return errorResponse(res, 'Event not found', 404);
    await event.update(req.body);
    return successResponse(res, event, 'Event updated successfully');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/events/:id (Admin Delete)
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);
    if (!event) return errorResponse(res, 'Event not found', 404);
    await event.destroy();
    return successResponse(res, null, 'Event deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent,
};

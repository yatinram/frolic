const { ContactMessage } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const createContact = async (req, res, next) => {
  try {
    const contact = await ContactMessage.create(req.body);
    logger.info(`[CONTACT MESSAGE] New message from ${contact.name} (${contact.email})`);
    return successResponse(res, contact, 'Your message has been sent successfully. We will get back to you shortly!', 201);
  } catch (error) {
    next(error);
  }
};

const getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactMessage.findAll({
      order: [['createdAt', 'DESC']],
    });
    return successResponse(res, contacts);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contact = await ContactMessage.findByPk(req.params.id);
    if (!contact) {
      return errorResponse(res, 'Message not found', 404);
    }
    await contact.destroy();
    return successResponse(res, null, 'Message deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  getContacts,
  deleteContact,
};

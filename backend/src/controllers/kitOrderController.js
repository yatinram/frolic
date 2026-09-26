const { KitOrder } = require('../models');
const { successResponse, errorResponse } = require('../utils/responseFormatter');

// POST /api/orders (Public Order Inquiry)
const createOrder = async (req, res, next) => {
  try {
    const order = await KitOrder.create(req.body);
    return successResponse(res, order, 'Kit order enquiry received successfully', 201);
  } catch (err) {
    next(err);
  }
};

// GET /api/orders (Admin List)
const getOrders = async (req, res, next) => {
  try {
    const orders = await KitOrder.findAll({
      order: [['createdAt', 'DESC']],
    });
    return successResponse(res, orders, `Fetched ${orders.length} kit orders`);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/orders/:id/status (Admin Update Status)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;
    const order = await KitOrder.findByPk(id);
    if (!order) return errorResponse(res, 'Order not found', 404);

    if (status) order.status = status;
    if (adminNotes !== undefined) order.adminNotes = adminNotes;
    await order.save();

    return successResponse(res, order, 'Order status updated');
  } catch (err) {
    next(err);
  }
};

// DELETE /api/orders/:id (Admin Delete)
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await KitOrder.findByPk(id);
    if (!order) return errorResponse(res, 'Order not found', 404);
    await order.destroy();
    return successResponse(res, null, 'Order deleted successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
};

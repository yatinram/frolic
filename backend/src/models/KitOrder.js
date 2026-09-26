const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const KitOrder = sequelize.define('KitOrder', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  parentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('new', 'contacted', 'dispatched', 'delivered', 'cancelled'),
    defaultValue: 'new',
  },
  adminNotes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'kit_orders',
  timestamps: true,
});

module.exports = KitOrder;

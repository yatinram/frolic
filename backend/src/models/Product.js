const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'kits',
  },
  badge: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  badgeColor: {
    type: DataTypes.STRING,
    defaultValue: 'orange',
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  images: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  sizes: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  specifications: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subPrice: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  items: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  inStock: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'products',
  timestamps: true,
});

module.exports = Product;

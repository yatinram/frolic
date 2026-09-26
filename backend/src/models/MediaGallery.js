const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MediaGallery = sequelize.define('MediaGallery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'activities', // classroom, events, kits, activities, infrastructure
  },
  altText: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'media_gallery',
  timestamps: true,
});

module.exports = MediaGallery;

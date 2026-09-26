const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Testimonial = sequelize.define('Testimonial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'Parent',
  },
  childName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  program: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    validate: { min: 1, max: 5 },
  },
  quote: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
}, {
  tableName: 'testimonials',
  timestamps: true,
});

module.exports = Testimonial;

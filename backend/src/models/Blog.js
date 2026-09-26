const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Blog = sequelize.define('Blog', {
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
  summary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  author: {
    type: DataTypes.STRING,
    defaultValue: 'Frolic Edu Team',
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Early Education',
  },
  readTime: {
    type: DataTypes.STRING,
    defaultValue: '4 min read',
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  publishedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'blogs',
  timestamps: true,
});

module.exports = Blog;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Center = sequelize.define('Center', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  branchType: {
    type: DataTypes.STRING,
    defaultValue: 'Edu Lab & Preschool',
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  district: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  taluka: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Gujarat',
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: 'frolickidsedulabs@gmail.com',
  },
  timing: {
    type: DataTypes.STRING,
    defaultValue: 'Monday – Saturday: 8:30 AM – 5:30 PM',
  },
  programs: {
    type: DataTypes.JSON,
    defaultValue: ['Play Group', 'Nursery', 'LKG', 'UKG', 'English Lab', 'Maths Lab'],
  },
  facilities: {
    type: DataTypes.JSON,
    defaultValue: ['CCTV Monitored', 'Smart Digital Classrooms', 'Language & Phonics Lab', 'Activity Play Zone'],
  },
  mapQuery: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 7),
    allowNull: true,
  },
  isFlagship: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'centers',
  timestamps: true,
});

module.exports = Center;

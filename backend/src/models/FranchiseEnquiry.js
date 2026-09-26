const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { FRANCHISE_STATUS } = require('../config/constants');

const FranchiseEnquiry = sequelize.define('FranchiseEnquiry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    defaultValue: 'Gujarat',
  },
  spaceAvailableSqft: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  investmentCapacity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      FRANCHISE_STATUS.NEW,
      FRANCHISE_STATUS.IN_REVIEW,
      FRANCHISE_STATUS.APPROVED,
      FRANCHISE_STATUS.CLOSED
    ),
    defaultValue: FRANCHISE_STATUS.NEW,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'franchise_enquiries',
  timestamps: true,
});

module.exports = FranchiseEnquiry;

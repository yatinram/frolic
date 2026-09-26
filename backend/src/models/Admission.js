const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { ADMISSION_STATUS } = require('../config/constants');

const Admission = sequelize.define('Admission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  childName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  parentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: { isEmail: true },
  },
  program: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preferredCenter: {
    type: DataTypes.STRING,
    defaultValue: 'Gandhinagar',
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(
      ADMISSION_STATUS.NEW,
      ADMISSION_STATUS.CONTACTED,
      ADMISSION_STATUS.ENROLLED,
      ADMISSION_STATUS.CLOSED
    ),
    defaultValue: ADMISSION_STATUS.NEW,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'admissions',
  timestamps: true,
});

module.exports = Admission;

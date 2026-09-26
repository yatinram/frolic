const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const { ROLES } = require('../config/constants');
const bcrypt = require('bcryptjs');

const AdminUser = sequelize.define('AdminUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(ROLES.SUPER_ADMIN, ROLES.EDITOR),
    defaultValue: ROLES.SUPER_ADMIN,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  lastLogin: {
    type: DataTypes.DATE,
  }
}, {
  tableName: 'admin_users',
  timestamps: true,
});

AdminUser.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

module.exports = AdminUser;

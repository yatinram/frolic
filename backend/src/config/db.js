const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const config = require('./env');
const logger = require('../utils/logger');

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    port: config.DB_PORT,
    dialect: 'mysql',
    logging: (msg) => logger.debug(msg),
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const initDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.DB_HOST,
      port: config.DB_PORT,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.DB_NAME}\`;`);
    await connection.end();
    logger.info(`Database '${config.DB_NAME}' ensured.`);
  } catch (err) {
    logger.warn(`Could not verify/create database via mysql2: ${err.message}`);
  }
};

const connectDB = async () => {
  try {
    await initDatabase();
    await sequelize.authenticate();
    logger.info('✅ MySQL Sequelize connection established successfully.');
    return true;
  } catch (error) {
    logger.error('❌ Unable to connect to MySQL database:', error);
    return false;
  }
};

module.exports = {
  sequelize,
  connectDB,
};

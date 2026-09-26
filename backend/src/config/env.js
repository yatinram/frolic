require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'frolic_db',
  DB_PORT: process.env.DB_PORT || 3306,
  JWT_SECRET: process.env.JWT_SECRET || 'frolic_super_secret_enterprise_key_2025',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'frolickidsedulabs@gmail.com',
  SMTP: {
    HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    PORT: process.env.SMTP_PORT || 587,
    USER: process.env.SMTP_USER || 'frolickidsedulabs@gmail.com',
    PASS: process.env.SMTP_PASS || '',
  }
};

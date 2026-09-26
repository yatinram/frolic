const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const config = require('./config/env');
const logger = require('./utils/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorMiddleware');
const { errorResponse } = require('./utils/responseFormatter');

const app = express();

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// CORS Configuration
const allowedOrigins = [config.CLIENT_URL, 'http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow during development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // 300 requests per window
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', apiLimiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP Request Logger
const morganStream = {
  write: (message) => logger.info(message.trim()),
};
app.use(morgan(config.NODE_ENV === 'production' ? 'combined' : 'dev', { stream: morganStream }));

// Static Media Folder for Uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Mount API Routes
app.use('/api', routes);

// Catch 404
app.use((req, res) => {
  return errorResponse(res, `Route '${req.originalUrl}' not found on this server.`, 404);
});

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;

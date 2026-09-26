const path = require('path');
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const logDirectory = path.join(__dirname, '../../logs');

const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.splat(),
  format.printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] [${level.toUpperCase()}]: ${stack || message}`;
  })
);

const errorRotateTransport = new transports.DailyRotateFile({
  filename: path.join(logDirectory, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxFiles: '14d',
  maxSize: '20m',
  zippedArchive: true,
});

const combinedRotateTransport = new transports.DailyRotateFile({
  filename: path.join(logDirectory, 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
  maxSize: '20m',
  zippedArchive: true,
});

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: customFormat,
  transports: [
    errorRotateTransport,
    combinedRotateTransport,
    new transports.File({ filename: path.join(logDirectory, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logDirectory, 'combined.log') })
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, stack }) => {
          return `[${timestamp}] ${level}: ${stack || message}`;
        })
      ),
    })
  );
}

module.exports = logger;

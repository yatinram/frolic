const app = require('./src/app');
const config = require('./src/config/env');
const { connectDB, sequelize } = require('./src/config/db');
const seedInitialData = require('./src/seeders/initialSeed');
const logger = require('./src/utils/logger');

const startServer = async () => {
  try {
    logger.info('Initializing Frolic Kids Edu Labs Enterprise Backend...');
    const dbConnected = await connectDB();

    if (dbConnected) {
      try {
        await sequelize.sync({ alter: true });
        logger.info('Sequelize models synchronized successfully.');
        await seedInitialData();
      } catch (syncErr) {
        logger.warn(`Sequelize synchronization warning: ${syncErr.message}`);
      }
    } else {
      logger.warn('Running in decoupled mode (Database not available yet). APIs will return validation/server status.');
    }

    const server = app.listen(config.PORT, () => {
      logger.info(`🚀 Frolic Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
      logger.info(`🌐 API Endpoint: http://localhost:${config.PORT}/api/health`);
    });

    const gracefulShutdown = () => {
      logger.info('Received kill signal, shutting down gracefully...');
      server.close(() => {
        logger.info('Closed out remaining connections.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', gracefulShutdown);
    process.on('SIGINT', gracefulShutdown);

  } catch (error) {
    logger.error(`Critical server initialization error: ${error.message}`, { stack: error.stack });
    process.exit(1);
  }
};

startServer();

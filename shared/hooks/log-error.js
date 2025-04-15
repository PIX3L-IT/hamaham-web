// log-error.js
const { logger } = require('../../config/logger');

async function logError(context, next) {
  try {
    await next();
  } catch (error) {
    logger.error(error.stack);
    // Log validation errors
    if (error.data) {
      logger.error('Data: %O', error.data);
    }
    throw error;
  }
}

module.exports = {
  logError
};
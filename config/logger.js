const { createLogger, format, transports } = require('winston');

// Configura el logger de Winston
const logger = createLogger({
  level: 'info', // Cambia a 'debug' para mayor detalle
  format: format.combine(format.splat(), format.simple()),
  transports: [new transports.Console()]
});

module.exports = {
  logger
};
const logger = require('../logger');

module.exports = () => (context) => {

  logger.info(`${context.type} app.service('${context.path}').${context.method}()`);

  if (typeof context.toJSON === 'function') {
    logger.debug('Hook Context', JSON.stringify(context, null, '  '));
  }

  if (context.error) {
    logger.error(context.error);
  }

};

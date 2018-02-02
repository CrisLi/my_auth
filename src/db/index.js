const mongoose = require('mongoose');
const logger = require('../logger');

mongoose.Promise = global.Promise;

module.exports = (app) => {

  const { url } = app.get('db');

  mongoose.connect(url)
    .then(() => {
      logger.info('Database connect successfully.');
    })
    .catch((err) => {
      logger.error('Database connect failed.', err);
    });
};

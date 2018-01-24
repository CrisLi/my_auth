const mongoose = require('mongoose');
const mongooseService = require('feathers-mongoose');
const homeService = require('./home.service');
const authHooks = require('../hooks/auth.hooks');
const userModel = require('../models/user.model');
const userHooks = require('../hooks/user.hooks');
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

  app.service(app.get('auth').path).hooks(authHooks);

  app.use('/home', homeService);
  app.use('/users', mongooseService({
    Model: userModel
  }));
  app.service('users').hooks(userHooks);

};

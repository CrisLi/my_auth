const mongooseService = require('feathers-mongoose');
const homeService = require('./home.service');
const authHooks = require('../hooks/auth.hooks');
const userModel = require('../models/user.model');
const userHooks = require('../hooks/user.hooks');

module.exports = (app) => {

  app.service(app.get('auth').path).hooks(authHooks);

  app.use('/home', homeService);
  app.use('/users', mongooseService({
    Model: userModel
  }));
  app.service('users').hooks(userHooks);

};

const homeService = require('./home.service');
const userService = require('./user.service');

module.exports = (app) => {
  app.use('/home', homeService);
  app.use('/users', userService);
};

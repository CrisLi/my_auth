const auth = require('@feathersjs/authentication');
const userIdentifier = require('./user.identifier');

module.exports = {
  before: {
    create: [
      userIdentifier,
      auth.hooks.authenticate(['local', 'jwt'])
    ]
  }
};

const auth = require('@feathersjs/authentication');
const userIdentifier = require('./user.identifier');

module.exports = {
  before: {
    create: [
      userIdentifier,
      auth.hooks.authenticate(['local']),
      (context) => {
        const { params, params: { user = {} } } = context;
        params.payload = {
          id: user['_id'],
          username: user.username,
          org: user.org,
          roles: user.roles
        };
      }
    ]
  }
};

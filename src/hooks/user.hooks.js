const { Conflict } = require('@feathersjs/errors');
const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const { disallow } = require('feathers-hooks-common');
const userIdentifier = require('./user.identifier');

module.exports = {
  before: {
    create: [
      local.hooks.hashPassword({ passwordField: 'password' }),
      userIdentifier
    ],
    find: [
      auth.hooks.authenticate('jwt')
    ],
    update: disallow(),
    patch: disallow(),
    remove: disallow()
  },
  after: [
    local.hooks.protect('password'),
    local.hooks.protect('identifier')
  ],
  error: {
    create: [
      async (context) => {
        if (context.error.code === 409) {
          // eslint-disable-next-line
          context.error = new Conflict('Username already existed in this org.');
        }
      }
    ]
  }
};

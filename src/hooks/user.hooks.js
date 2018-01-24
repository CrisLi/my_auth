const { Conflict } = require('@feathersjs/errors');
const { disallow } = require('feathers-hooks-common');

module.exports = {
  before: {
    create: [
      async (context) => {
        const { data } = context;
        data.identifier = Buffer.from(`${data.username}@${data.org}`).toString('base64');
      }
    ],
    remove: disallow(),
    update: disallow(),
    patch: disallow()
  },
  after: {
    create: [
      async (context) => {
        const { result } = context;
        delete result['identifier'];
        delete result['password'];
      }
    ]
  },
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

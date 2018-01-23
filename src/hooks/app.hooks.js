const logger = require('./logger');

module.exports = {
  before: {
    all: [logger()]
  },
  after: {
    all: [logger()]
  },
  error: {
    all: [logger()]
  }
};

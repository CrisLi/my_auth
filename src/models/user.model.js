const { model, schema } = require('./helper');

const user = {
  identifier: {
    type: String,
    unique: true,
    select: false
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  org: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    default: ['USER']
  }
};

const userSchema = schema(user);

const User = model('User', userSchema);

module.exports = User;

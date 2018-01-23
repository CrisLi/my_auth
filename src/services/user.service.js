
class UserService {

  setup(app) {
    this.app = app;
  }

  constructor() {
    this.users = [];
  }

  async find() {
    return this.users;
  }

  async get(id) {
    return this.users.find((user) => user.id.toString() === id);
  }

  async create(data) {
    const user = Object.assign({ id: this.users.length + 1 }, data);
    this.users.push(user);
    return user;
  }

}

module.exports = new UserService();

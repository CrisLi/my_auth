
class HomeService {

  async find() {
    return {
      message: 'This my-auth service'
    };
  }

}

module.exports = new HomeService();

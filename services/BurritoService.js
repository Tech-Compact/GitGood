const db  = require('../models');

class BurritoService {

  async getAllBurritos() {
    return await db.Burrito.findAll();
  }

  async createBurrito(data) {
    return await db.Burrito.create(data);
  }

}

module.exports = BurritoService;

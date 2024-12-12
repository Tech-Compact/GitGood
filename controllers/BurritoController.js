const BurritoService = require('../services/BurritoService');
const burritoService = new BurritoService();

class BurritoController {
 
  async getAllBurritos(req, res) {
    try {
        const burritos = await burritoService.getAllBurritos();
        res.json(burritos);
    } catch (error) {
        console.error('Error fetching burritos:', error);
        res.status(404).send('Not Found');
    }
  }

  async createBurrito(req, res) {
    const newBurrito = req.body;
    const createdBurrito = await burritoService.createBurrito(newBurrito);
    res.status(201).json(createdBurrito);
  }

}

module.exports = BurritoController;

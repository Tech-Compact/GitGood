const express = require('express');
const router = express.Router();

const BurritoController = require('../controllers/BurritoController');
const OrderController = require('../controllers/OrderController');
const UserController = require('../controllers/UserController');

const burritoController = new BurritoController();
const userController = new UserController();
const orderController = new OrderController();

router.get('/burrito', burritoController.getAllBurritos);
router.post('/burrito', burritoController.createBurrito);

router.get('/orders', orderController.getAllOrders)
router.get('/orders/:id', orderController.getOrder)
router.post('/orders', orderController.createOrder)

router.get('/ubers', userController.getUsers);

module.exports = router;

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

const userController = new UserController();

router.get('/users', userController.getUsers);

module.exports = router;

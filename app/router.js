const express = require('express');
let router = express.Router();

const UsersController = require('./controllers/UsersController.js');
router.get('/users/:token', UsersController.getUser);
router.post('/users/:token', UsersController.newUser);

module.exports = router;

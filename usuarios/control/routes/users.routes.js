const express = require('express');
const usersController = require('../controllers/users.controller')
const router = express.Router();

router.get('/', usersController.getPermissions);

router.get('/edit/:firebaseUID', usersController.postEditPermissions);

module.exports = router;
const express = require('express');
const userController = require('../controllers/user.controller')

const router = express.Router()

router.get('/login', userController.getLogin)
router.get('/registrar', userController.getSignUp)
router.post('/login', userController.postLogin)
router.post('/registrar', userController.postSignUp)


// Permisos
router.get('/', userController.getPermissions);

router.get('/edit/:firebaseUID', userController.postEditPermissions);

module.exports = router;
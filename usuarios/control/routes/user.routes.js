const express = require('express');
const usuariosController = require('../controllers/user.controller')

const router = express.Router()

router.get('/login-test', usuariosController.getLogin)
router.get('/registrar-test', usuariosController.getSignUp)
router.post('/login-test', usuariosController.postLogin)
router.post('/registrar-test', usuariosController.postSignUp)

module.exports = router;
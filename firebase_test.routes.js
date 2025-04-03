const express = require('express');
const usuariosController = require('usuarios_test.controller')

const router = express.Router()

router.get('/login-test', usuariosController.get_login)
router.get('/registrar-test', usuariosController.get_registrar)
router.post('/login-test', usuariosController.post_login)
router.post('/registrar-test', usuariosController.post_login)

module.exports = router;
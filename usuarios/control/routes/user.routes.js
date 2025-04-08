const express = require('express');
const usuariosController = require('../controllers/user.controller')

const router = express.Router()

router.get('/login-test', usuariosController.get_login)
router.get('/registrar-test', usuariosController.get_registrar)
router.post('/login-test', usuariosController.post_login)
router.post('/registrar-test', usuariosController.post_registrar)

module.exports = router;
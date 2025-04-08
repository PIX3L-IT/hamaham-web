const express = require('express');
const usuariosController = require('../controllers/user.controller')

const router = express.Router()

router.get('/login', usuariosController.getLogin)
router.get('/registrar', usuariosController.getSignUp)
router.post('/login', usuariosController.postLogin)
router.post('/registrar', usuariosController.postSignUp)

module.exports = router;
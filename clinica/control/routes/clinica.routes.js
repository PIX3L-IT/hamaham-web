const express = require('express');
const router = express.Router();
const clinicaController = require('../controllers/clinica.controller');

// Ruta para el menú principal
router.get('/menu', clinicaController.getMenu);

module.exports = router;
const express = require('express');
const patientsController = require('../controllers/patients.controller')

const router = express.Router();

// Listar patients
router.get('/', patientsController.get_patients);

// Mostrar formulario para crear
router.get('/create', patientsController.get_agregar_patient);
router.post('/create', patientsController.post_agregar_patient);

// Mostrar formulario para editar
router.get('/edit/:id', patientsController.get_modificar_patient);
router.patch('/edit/:id', patientsController.patch_modificar_patient);

// Eliminar patient
router.delete('/delete/:id', patientsController.delete_eliminar_patient);

module.exports = router;
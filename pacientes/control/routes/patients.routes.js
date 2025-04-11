const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients.controller');

// Rutas para gestión de pacientes

// Obtener listado de pacientes
router.get('/', patientsController.getPatients);

// Mostrar formulario de creación de paciente
router.get('/create', patientsController.getCreatePatient);

// Registrar nuevo paciente
router.post('/create', patientsController.postCreatePatient);

// Mostrar formulario de edición de paciente
router.get('/edit/:id', patientsController.getEditPatient);

// Actualizar datos de un paciente
router.patch('/edit/:id', patientsController.patchEditPatient);

// Eliminar paciente
router.delete('/delete/:id', patientsController.deletePatient);

// Descargar pacientes
router.get('/download', patientsController.getDownloadPatients);
router.get('/download-pdf', patientsController.getDownloadPDF);
module.exports = router;

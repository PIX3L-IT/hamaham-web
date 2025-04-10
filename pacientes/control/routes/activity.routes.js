const express = require('express');
const router = express.Router();
const Patient = require('../../models/patient.model');

const { body, validationResult } = require('express-validator');
const sanitize = require('mongo-sanitize');

router.get('/add-patient', (req, res) => {
  res.send(`
    <h2>Agregar nuevo paciente</h2>
    <form method="POST" action="/pacientes/add-patient">
      <label>ID del paciente:</label><br>
      <input name="IdPatient" required /><br><br>
      <label>Nombre:</label><br>
      <input name="Name" required /><br><br>
      <label>Email:</label><br>
      <input name="Email" /><br><br>
      <label>Teléfono:</label><br>
      <input name="Phone" type="number" /><br><br>
      <button type="submit">Guardar</button>
    </form>
  `);
});


router.post(
  '/add-patient',
  [
    body('IdPatient').trim().escape().notEmpty(),
    body('Name').trim().escape().notEmpty(),
    body('Email').optional().isEmail().normalizeEmail(),
    body('Phone').optional().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(`<h2>Datos inválidos</h2><pre>${JSON.stringify(errors.array(), null, 2)}</pre>`);
    }

    try {
      const { IdPatient, Name, Email, Phone } = req.body;

      const newPatient = new Patient({
        IdPatient: sanitize(IdPatient),
        Name: sanitize(Name),
        Email: sanitize(Email),
        Phone: Phone ? parseInt(sanitize(Phone)) : undefined
      });

      await newPatient.save();

      res.send(`<h2>Paciente agregado correctamente</h2><pre>${JSON.stringify(newPatient, null, 2)}</pre>`);
    } catch (error) {
      res.status(500).send(`<h2>Error al agregar paciente</h2><pre>${error.message}</pre>`);
    }
  }
);


module.exports = router;
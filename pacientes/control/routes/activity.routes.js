const express = require('express');
const router = express.Router();
const Patient = require('../../models/patient.model');

const { body, validationResult } = require('express-validator');
const sanitize = require('mongo-sanitize');

/*
  Description:
  Renderiza un formulario HTML simple para registrar un nuevo paciente.
*/
router.get('/add-patient', (request, response) => {
  response.send(`
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

/*
  Description:
  Procesa el formulario POST para registrar un nuevo paciente.
  Incluye validación y sanitización para prevenir ataques de inyección.
*/
router.post(
  '/add-patient',
  [
    body('IdPatient').trim().escape().notEmpty(),
    body('Name').trim().escape().notEmpty(),
    body('Email').optional().isEmail().normalizeEmail(),
    body('Phone').optional().isNumeric(),
  ],
  async (request, response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response
        .status(400)
        .send(`<h2>Datos inválidos</h2><pre>${JSON.stringify(errors.array(), null, 2)}</pre>`);
    }

    try {
      const idPatientSanitized = sanitize(request.body.IdPatient);
      const nameSanitized = sanitize(request.body.Name);
      const emailSanitized = sanitize(request.body.Email);
      const phoneSanitized = request.body.Phone
        ? parseInt(sanitize(request.body.Phone))
        : undefined;

      const newPatient = new Patient({
        IdPatient: idPatientSanitized,
        Name: nameSanitized,
        Email: emailSanitized,
        Phone: phoneSanitized,
      });

      await newPatient.save();

      response.send(
        `<h2>✅ Paciente agregado correctamente</h2><pre>${JSON.stringify(newPatient, null, 2)}</pre>`
      );
    } catch (error) {
      console.error(error.message);
      response
        .status(500)
        .send(`<h2>❌ Error al agregar paciente</h2><pre>${error.message}</pre>`);
    }
  }
);

module.exports = router;

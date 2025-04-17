const express = require('express');
const router = express.Router();
const Patient = require('../../models/patients.model');

const { body, validationResult } = require('express-validator');
const sanitize = require('mongo-sanitize');

/*
  Description:
  Renderiza un formulario HTML simple para registrar un nuevo paciente.
*/
router.get('/add-patient', (request, response) => {
  response.render('patients-create')
});

/*
  Description:
  Procesa el formulario POST para registrar un nuevo paciente.
  Incluye validación y sanitización para prevenir ataques de inyección.
*/

router.post(
  "/registrar_paciente",
  [
    body("Name").trim().escape().notEmpty(),
    body("Email").optional().isEmail().normalizeEmail(),
    body("Phone").optional().isNumeric(),
    // puedes seguir agregando validaciones aquí si lo deseas
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send(`<h2>Datos inválidos</h2><pre>${JSON.stringify(errors.array(), null, 2)}</pre>`);
    }

    try {
      const sanitizeField = (field) =>
        field ? sanitize(field, { allowedTags: [], allowedAttributes: {} }) : undefined;

      const Pathological_Antecedents = req.body.Pathological_Antecedents || {};
      const Non_Pathological_Antecedents = req.body.Non_Pathological_Antecedents || {};
      const Family_History = req.body.Family_History || {}; 

      const newPatient = new Patient({
        Name: sanitizeField(req.body.Name),
        Email: sanitizeField(req.body.Email),
        Phone: req.body.Phone ? parseInt(req.body.Phone) : undefined,
        Religion: sanitizeField(req.body.Religion),
        Marital_Status: sanitizeField(req.body.Marital_Status),
        Occupation: sanitizeField(req.body.Occupation),
        Education: sanitizeField(req.body.Education),
        Emergency_Contact: sanitizeField(req.body.Emergency_Contact),
        Weight: req.body.Weight ? parseFloat(req.body.Weight) : undefined,
        Height: req.body.Height ? parseFloat(req.body.Height) : undefined,
        Date_of_Birth: req.body.Date_of_Birth,
        Reason_for_Consultation: sanitizeField(req.body.Reason_for_Consultation),

        Pathological_Antecedents: {
          Systematic_Diseases: sanitizeField(Pathological_Antecedents?.Systematic_Diseases),
          Surgical_Antecedents: sanitizeField(Pathological_Antecedents?.Surgical_Antecedents),
          Hospitalizations: sanitizeField(Pathological_Antecedents?.Hospitalizations),
          Pregnancies: sanitizeField(Pathological_Antecedents?.Pregnancies),
          Musculoskeletal_Problems: sanitizeField(Pathological_Antecedents?.Musculoskeletal_Problems),
          Transfusions: sanitizeField(Pathological_Antecedents?.Transfusions),
          Allergies: sanitizeField(Pathological_Antecedents?.Allergies),
        },
      
        Non_Pathological_Antecedents: {
          Alcohol: sanitizeField(Non_Pathological_Antecedents?.Alcohol),
          Other_Substances: sanitizeField(Non_Pathological_Antecedents?.Other_Substances),
          Food: sanitizeField(Non_Pathological_Antecedents?.Food),
          Hidration: sanitizeField(Non_Pathological_Antecedents?.Hidration),
          Physical_Activity: sanitizeField(Non_Pathological_Antecedents?.Physical_Activity),
          Laboral_Activity: sanitizeField(Non_Pathological_Antecedents?.Laboral_Activity),
          Sleep: sanitizeField(Non_Pathological_Antecedents?.Sleep),
          Stress: sanitizeField(Non_Pathological_Antecedents?.Stress),
        },
      
        Family_History: {
          Arterial_Hypertension: sanitizeField(Family_History?.Arterial_Hypertension),
          Diabetes: sanitizeField(Family_History?.Diabetes),
          Cancer: sanitizeField(Family_History?.Cancer),
          Acute_Myocardial_Infarction: sanitizeField(Family_History?.Acute_Myocardial_Infarction),
          Cerebrovascular_Accident: sanitizeField(Family_History?.Cerebrovascular_Accident),
          Viral_Respiratory_Infections: sanitizeField(Family_History?.Viral_Respiratory_Infections),
          Thyroid_Disease: sanitizeField(Family_History?.Thyroid_Disease),
          Rheumatoid_Arthritis_Lupus: sanitizeField(Family_History?.Rheumatoid_Arthritis_Lupus),
          Neuromuscular_Disorders: sanitizeField(Family_History?.Neuromuscular_Disorders),
          Down_Syndrome: sanitizeField(Family_History?.Down_Syndrome),
          Mental_Disorders: sanitizeField(Family_History?.Mental_Disorders),
          Other: sanitizeField(Family_History?.Other),
        },
      });
      console.log('Request Body:', req.body);
      await newPatient.save();

      res.send(
        `<h2>✅ Paciente agregado correctamente</h2><pre>${JSON.stringify(newPatient, null, 2)}</pre>`
        
      );
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .send(`<h2>❌ Error al agregar paciente</h2><pre>${error.message}</pre>`);
    }
  }
);

module.exports = router;

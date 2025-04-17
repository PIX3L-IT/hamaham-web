const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATIENT = require('../../models/patients.model');

const { BODY, VALIDATION_RESULT } = require('express-validator');
const SANITIZE = require('mongo-sanitize');

/*
  Description:
  Renderiza un formulario HTML simple para registrar un nuevo paciente.
*/
ROUTER.get('/registrar_paciente', (request, response) => {
  response.render('register-patient')
});

/*
  Description:
  Procesa el formulario POST para registrar un nuevo paciente.
  Incluye validación y sanitización para prevenir ataques de inyección.
*/

ROUTER.post(
  "/registrar_paciente",
  [
    BODY("Name").trim().escape().notEmpty(),
    BODY("Email").optional().isEmail().normalizeEmail(),
    BODY("Phone").optional().isNumeric(),
    // puedes seguir agregando validaciones aquí si lo deseas
  ],
  async (req, res) => {
    const errors = VALIDATION_RESULT(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .send(`<h2>Datos inválidos</h2><pre>${JSON.stringify(errors.array(), null, 2)}</pre>`);
    }

    try {
      const sanitizeField = (field) =>
        field ? SANITIZE(field, { allowedTags: [], allowedAttributes: {} }) : undefined;

      const Pathological_Antecedents = req.BODY.Pathological_Antecedents || {};
      const Non_Pathological_Antecedents = req.BODY.Non_Pathological_Antecedents || {};
      const Family_History = req.BODY.Family_History || {}; 

      const newPatient = new PATIENT({
        Name: sanitizeField(req.BODY.Name),
        Email: sanitizeField(req.BODY.Email),
        Phone: req.BODY.Phone ? parseInt(req.BODY.Phone) : undefined,
        Religion: sanitizeField(req.BODY.Religion),
        Marital_Status: sanitizeField(req.BODY.Marital_Status),
        Occupation: sanitizeField(req.BODY.Occupation),
        Education: sanitizeField(req.BODY.Education),
        Emergency_Contact: sanitizeField(req.BODY.Emergency_Contact),
        Weight: req.BODY.Weight ? parseFloat(req.BODY.Weight) : undefined,
        Height: req.BODY.Height ? parseFloat(req.BODY.Height) : undefined,
        Date_of_Birth: req.BODY.Date_of_Birth,
        Reason_for_Consultation: sanitizeField(req.BODY.Reason_for_Consultation),

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

module.exports = ROUTER;

const SANITIZE = require('mongo-sanitize');
const PDF_DOCUMENT = require('pdfkit');

exports.getDownloadPatients = async (req, res, next) => {
      try {
            res.render('patients-download');
      } catch(error){
            console.error(error.message);
      }
}

exports.getDownloadPDF = async (req, res, next) => {
      try {
            const patientsService = req.app.service('api/patients');
            const patients = await patientsService.find()

            const doc = new PDF_DOCUMENT();
            res.setHeader('Content-Disposition', 'attachment; filename=patients.pdf')
            res.setHeader('Content-Type', 'application/pdf');

            doc.pipe(res);

            doc.fontSize(18).text('Lista de Pacientes', {align: 'center'}).moveDown();

            patients.forEach((patient, i) => {
                  doc.fontSize(12).text(`[${patient.IdPatient}] ${patient.Name} - ${patient.Email}`)
            });

            doc.end();


      } catch(error){
            console.error(error.message);
      }
}

/*
  Description:
  Lists all registered patients from the database.

  Parameters:
  - request: Express Request Object
  - response: Express Response Object
  - next: Express Next Function

  Returns:
  - Renders 'patients-list' view with all patients or 500 error page
*/

exports.getPatients = async (request, response, next) => {
  try {
    const patients = await request.app.service('api/patients').find();
    response.render('patients-list', { patients });
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
  }
};

/*
  Description:
  Renders the patient creation form.

  Parameters:
  - request: Express Request Object
  - response: Express Response Object
  - next: Express Next Function
*/

exports.getCreatePatient = async (request, response, next) => {
  response.render('patients-create');
};

/*
  Descripción:
  Crea un nuevo paciente en la base de datos después de sanitizar los datos de entrada.
  Parametros:
  - request: Objeto Express Request
  - response: Objecto Express Response 
*/
exports.postCreatePatient = async (req, res) => {
  try {
    const sanitizedBody = {
      Name: SANITIZE(req.body.Name),
      Email: SANITIZE(req.body.Email),
      Phone: SANITIZE(req.body.Phone),
      Religion: SANITIZE(req.body.Religion),
      Marital_Status: SANITIZE(req.body.Marital_Status),
      Occupation: SANITIZE(req.body.Occupation),
      Education: SANITIZE(req.body.Education),
      Emergency_Contact: SANITIZE(req.body.Emergency_Contact),
      Weight: SANITIZE(req.body.Weight),
      Height: SANITIZE(req.body.Height),
      Date_of_Birth: SANITIZE(req.body.Date_of_Birth),
      Reason_for_Consultation: SANITIZE(req.body.Reason_for_Consultation),

      Pathological_Antecedents: {
        Systematic_Diseases: SANITIZE(req.body.Pathological_Antecedents?.Systematic_Diseases),
        Surgical_Antecedents: SANITIZE(req.body.Pathological_Antecedents?.Surgical_Antecedents),
        Hospitalizations: SANITIZE(req.body.Pathological_Antecedents?.Hospitalizations),
        Pregnancies: SANITIZE(req.body.Pathological_Antecedents?.Pregnancies),
        Musculoskeletal_Problems: SANITIZE(req.body.Pathological_Antecedents?.Musculoskeletal_Problems),
        Transfusions: SANITIZE(req.body.Pathological_Antecedents?.Transfusions),
        Allergies: SANITIZE(req.body.Pathological_Antecedents?.Allergies),
      },

      Non_Pathological_Antecedents: {
        Alcohol: SANITIZE(req.body.Non_Pathological_Antecedents?.Alcohol),
        Other_Substances: SANITIZE(req.body.Non_Pathological_Antecedents?.Other_Substances),
        Food: SANITIZE(req.body.Non_Pathological_Antecedents?.Food),
        Hidration: SANITIZE(req.body.Non_Pathological_Antecedents?.Hidration),
        Physical_Activity: SANITIZE(req.body.Non_Pathological_Antecedents?.Physical_Activity),
        Laboral_Activity: SANITIZE(req.body.Non_Pathological_Antecedents?.Laboral_Activity),
        Sleep: SANITIZE(req.body.Non_Pathological_Antecedents?.Sleep),
        Stress: SANITIZE(req.body.Non_Pathological_Antecedents?.Stress),
      },

      Family_History: {
        Arterial_Hypertension: SANITIZE(req.body.Family_History?.Arterial_Hypertension),
        Diabetes: SANITIZE(req.body.Family_History?.Diabetes),
        Cancer: SANITIZE(req.body.Family_History?.Cancer),
        Acute_Myocardial_Infarction: SANITIZE(req.body.Family_History?.Acute_Myocardial_Infarction),
        Cerebrovascular_Accident: SANITIZE(req.body.Family_History?.Cerebrovascular_Accident),
        Viral_Respiratory_Infections: SANITIZE(req.body.Family_History?.Viral_Respiratory_Infections),
        Thyroid_Disease: SANITIZE(req.body.Family_History?.Thyroid_Disease),
        Rheumatoid_Arthritis_Lupus: SANITIZE(req.body.Family_History?.Rheumatoid_Arthritis_Lupus),
        Neuromuscular_Disorders: SANITIZE(req.body.Family_History?.Neuromuscular_Disorders),
        Down_Syndrome: SANITIZE(req.body.Family_History?.Down_Syndrome),
        Mental_Disorders: SANITIZE(req.body.Family_History?.Mental_Disorders),
        Other: SANITIZE(req.body.Family_History?.Other),
      }
    };
    // Crea el nuevo paciente con datos sanitizados
    await req.app.service('api/patients').create(sanitizedBody);
    res.redirect('/patients');
  } catch (error) {
    console.error(error.message);
    res.status(500).render('500');
  }
};


/*
  Description:
  Retrieves a patient and renders the edit form.

  Parameters:
  - request: Express Request Object
  - response: Express Response Object
  - next: Express Next Function
*/
exports.getEditPatient = async (request, response, next) => {
  try {
    const id = SANITIZE(request.params.id);
    const patient = await request.app.service('api/patients').get(id);
    response.render('patients-edit', { patient });
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
  }
};

/*
  Description:
  Updates specific patient fields after sanitizing input.

  Parameters:
  - request: Express Request Object
  - response: Express Response Object
  - next: Express Next Function
*/
exports.patchEditPatient = async (request, response, next) => {
  try {
    const id = SANITIZE(request.params.id);
    const idPatient = SANITIZE(request.body.IdPatient);
    const email = SANITIZE(request.body.Email);
    const name = SANITIZE(request.body.Name);

    await request.app.service('api/patients').patch(id, {
      IdPatient: idPatient,
      Email: email,
      Name: name
    });

    response.redirect('/patients');
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
  }
};

/*
  Description:
  Deletes a patient by ID after sanitization.

  Parameters:
  - request: Express Request Object
  - response: Express Response Object
  - next: Express Next Function
*/
exports.deletePatient = async (request, response, next) => {
  try {
    const id = SANITIZE(request.params.id);
    await request.app.service('api/patients').remove(id);
    response.redirect('/patients');
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
  }
};
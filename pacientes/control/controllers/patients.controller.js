const sanitize = require('mongo-sanitize');
const PDFDocument = require('pdfkit');

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

            const doc = new PDFDocument();
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
  Description:
  Creates a new patient after sanitizing input.

  Parameters:
  - request: Express Request Object
  - response: Express Response Object
  - next: Express Next Function
*/
exports.postCreatePatient = async (req, res, next) => {
  try {
    const sanitizedBody = {
      Name: sanitize(req.body.Name),
      Email: sanitize(req.body.Email),
      Phone: sanitize(req.body.Phone),
      Religion: sanitize(req.body.Religion),
      Marital_Status: sanitize(req.body.Marital_Status),
      Occupation: sanitize(req.body.Occupation),
      Education: sanitize(req.body.Education),
      Emergency_Contact: sanitize(req.body.Emergency_Contact),
      Weight: sanitize(req.body.Weight),
      Height: sanitize(req.body.Height),
      Date_of_Birth: sanitize(req.body.Date_of_Birth),
      Reason_for_Consultation: sanitize(req.body.Reason_for_Consultation),

      Pathological_Antecedents: {
        Systematic_Diseases: sanitize(req.body.Pathological_Antecedents?.Systematic_Diseases),
        Surgical_Antecedents: sanitize(req.body.Pathological_Antecedents?.Surgical_Antecedents),
        Hospitalizations: sanitize(req.body.Pathological_Antecedents?.Hospitalizations),
        Pregnancies: sanitize(req.body.Pathological_Antecedents?.Pregnancies),
        Musculoskeletal_Problems: sanitize(req.body.Pathological_Antecedents?.Musculoskeletal_Problems),
        Transfusions: sanitize(req.body.Pathological_Antecedents?.Transfusions),
        Allergies: sanitize(req.body.Pathological_Antecedents?.Allergies),
      },

      Non_Pathological_Antecedents: {
        Alcohol: sanitize(req.body.Non_Pathological_Antecedents?.Alcohol),
        Other_Substances: sanitize(req.body.Non_Pathological_Antecedents?.Other_Substances),
        Food: sanitize(req.body.Non_Pathological_Antecedents?.Food),
        Hidration: sanitize(req.body.Non_Pathological_Antecedents?.Hidration),
        Physical_Activity: sanitize(req.body.Non_Pathological_Antecedents?.Physical_Activity),
        Laboral_Activity: sanitize(req.body.Non_Pathological_Antecedents?.Laboral_Activity),
        Sleep: sanitize(req.body.Non_Pathological_Antecedents?.Sleep),
        Stress: sanitize(req.body.Non_Pathological_Antecedents?.Stress),
      },

      Family_History: {
        Arterial_Hypertension: sanitize(req.body.Family_History?.Arterial_Hypertension),
        Diabetes: sanitize(req.body.Family_History?.Diabetes),
        Cancer: sanitize(req.body.Family_History?.Cancer),
        Acute_Myocardial_Infarction: sanitize(req.body.Family_History?.Acute_Myocardial_Infarction),
        Cerebrovascular_Accident: sanitize(req.body.Family_History?.Cerebrovascular_Accident),
        Viral_Respiratory_Infections: sanitize(req.body.Family_History?.Viral_Respiratory_Infections),
        Thyroid_Disease: sanitize(req.body.Family_History?.Thyroid_Disease),
        Rheumatoid_Arthritis_Lupus: sanitize(req.body.Family_History?.Rheumatoid_Arthritis_Lupus),
        Neuromuscular_Disorders: sanitize(req.body.Family_History?.Neuromuscular_Disorders),
        Down_Syndrome: sanitize(req.body.Family_History?.Down_Syndrome),
        Mental_Disorders: sanitize(req.body.Family_History?.Mental_Disorders),
        Other: sanitize(req.body.Family_History?.Other),
      }
    };

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
    const id = sanitize(request.params.id);
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
    const id = sanitize(request.params.id);
    const idPatient = sanitize(request.body.IdPatient);
    const email = sanitize(request.body.Email);
    const name = sanitize(request.body.Name);

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
    const id = sanitize(request.params.id);
    await request.app.service('api/patients').remove(id);
    response.redirect('/patients');
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
  }
};
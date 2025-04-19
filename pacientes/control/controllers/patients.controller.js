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
exports.postCreatePatient = async (request, response, next) => {
  try {
    const idPatient = sanitize(request.body.IdPatient);
    const email = sanitize(request.body.Email);
    const name = sanitize(request.body.Name);

    await request.app.service('api/patients').create({
      IdPatient: idPatient,
      Email: email,
      Name: name
    });

    response.redirect('/pacientes');
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
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

    response.redirect('/pacientes');
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
    response.redirect('/pacientes');
  } catch (error) {
    console.error(error.message);
    response.status(500).render('500');
  }
};
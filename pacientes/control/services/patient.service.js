const { Service } = require('feathers-mongoose');
const PatientModel = require('../../models/patients.model');


class PatientsService extends Service {
    // Aquí puedes sobrescribir métodos (find, get, create, etc.)
    // o añadir métodos personalizados.
}

function patientService(app) {
  const options = {
    Model: PatientModel,
    paginate: false
  };

  
  // Montamos el servicio en /api/patients
  const service = app.use('/api/patients', new PatientsService(options));
  

    service.hooks({
      before: {}
    });
  }
  
  module.exports = {
    patientService
  };
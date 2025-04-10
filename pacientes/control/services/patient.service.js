const { Service } = require('feathers-mongoose');
const PatientModel = require('../../models/patients.model');
const firebaseAuthHook = require('../../../usuarios/control/hooks/firebase-auth');


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
  
    // Aquí se añaden los hooks necesarios 
    // service.hooks({
    //   before: {
    //     find: [firebaseAuthHook],
    //     get: [firebaseAuthHook],
    //     patch: [firebaseAuthHook],
    //     remove: [firebaseAuthHook]
    //   }
    // });
  }
  
  module.exports = {
    patientService
  };
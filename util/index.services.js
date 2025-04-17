const patientService = require('../pacientes/control/services/patient.service');
const permissionService = require('../usuarios/control/services/permission.service');
const userService = require('../usuarios/control/services/user.service');

exports.services = function (app) {
    patientService(app);
    permissionService(app);
    userService(app);
}
const { Service } = require('feathers-mongoose');
const PermissionModel = require('../../models/permissions.model');

class PermissionsService extends Service {
    // Aquí puedes sobrescribir métodos (find, get, create, etc.)
    // o añadir métodos personalizados.
}

function permissionService(app) {
    const options = {
      Model: PermissionModel,
      paginate: false
    };
  
    // Montamos el servicio en /api/permissions
    app.use('/api/permissions', new PermissionsService(options));
  }
  
  module.exports = permissionService;
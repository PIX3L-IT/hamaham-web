const { Service } = require('feathers-mongoose');
const UserModel = require('../../models/users.model');

class UsersService extends Service {
    // Aquí puedes sobrescribir métodos (find, get, create, etc.)
    // o añadir métodos personalizados.
}

function userService(app) {
    const options = {
      Model: UserModel,
      paginate: false
    };
  
    // Montamos el servicio en /api/users
    const service = app.use('/api/users', new UsersService(options));
  
    // Aquí se añaden los hooks necesarios 
    service.hooks({
      before: {}
    });
  }
  
  module.exports = {
    userService
  };
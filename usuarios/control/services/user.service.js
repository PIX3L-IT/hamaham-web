const { Service } = require('feathers-mongoose');
const userModel = require('../../models/user.model');
const firebaseAuthHook = require('../hooks/firebase-auth');

class UsersService extends Service {
  // Aquí puedes sobrescribir métodos (find, get, create, etc.)
  // o añadir métodos personalizados.
}

function userService(app) {
  const options = {
    Model: userModel,
    paginate: false
  };

  // Montamos el servicio en /usuario
  app.use('/api/usuario', new UsersService(options));

  const service = app.service('/api/usuario');

  service.hooks({
    before: {
      find: [firebaseAuthHook],
      get: [firebaseAuthHook],
      patch: [firebaseAuthHook],
      remove: [firebaseAuthHook]
    }
  });
}

module.exports = {
  userService
};
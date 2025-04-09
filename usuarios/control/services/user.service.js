const { Service } = require('feathers-mongoose');
const UsuarioModel = require('../../models/user.model');
const firebaseAuthHook = require('../hooks/firebase-auth');

class UsuariosService extends Service {
  // Aquí puedes sobrescribir métodos (find, get, create, etc.)
  // o añadir métodos personalizados.
}

function usuarioService(app) {
  const options = {
    Model: UsuarioModel,
    paginate: false
  };

  // Montamos el servicio en /usuario
  const service = app.use('/api/usuario', new UsuariosService(options));

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
  usuarioService
};
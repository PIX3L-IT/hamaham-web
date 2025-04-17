const { Service } = require('feathers-mongoose');
const UserModel = require('../../models/users.model');
const firebaseAuthHook = require('../../control/hooks/firebase-auth');

class UsersService extends Service {}

const userService = app => {
  const options = {
    Model: UserModel,
    paginate: false
  }

  app.use('/api/users', new UsersService(options));

  app.service('api/users').hooks({
      before: {
        find: [firebaseAuthHook],
        get: [firebaseAuthHook],
        patch: [firebaseAuthHook],
        remove: [firebaseAuthHook]
      }
  });
};

module.exports = userService;
const { Types } = require('mongoose');

exports.getPermissions = async (request, response, next) => {
    try {
        // Llama al servicio Feathers para obtener todos los users
        const permissions = await request.app.service('api/permissions').find();
        // Renderiza la vista EJS
        console.log("Permisos:", permissions)
        response.status(200).json({ message: "Permisos: ", permissions: permissions });
  } catch (error) {
        console.error(error);
        response.status(500).render('500'); // Tu vista de error
  }
};
  

exports.postEditPermissions = async (request, response, next) => {
    try {
      const firebaseUID = request.params.firebaseUID;
      const result = await request.app.service('api/users').find({
        query: {
          firebaseUID: firebaseUID,
          $limit: 1
        }
      });
      id = result[0]._id
      
      //const { adminUsers, bills, patients, statistics } = request.body;
      const adminUsers = true;
      const bills = true;
      const patients = false;
      const statistics = true;
    
      const permissions = [];
  
      if (adminUsers === true) {
        permissions.push(new Types.ObjectId("67f468d759e0643dcf3ecb6c"));
      }
      if (bills === true) {
        permissions.push(new Types.ObjectId("67f468d759e0643dcf3ecb6c"));
      }
      if (patients === true) {
        permissions.push(new Types.ObjectId("67f468d759e0643dcf3ecb6c"));
      }
      if (statistics === true) {
        permissions.push(new Types.ObjectId("67f468d759e0643dcf3ecb6c"));
      }
  
      // Actualiza el usuario
      await request.app.service("api/users").patch(id, {
        permissions,
      });

      // Envía respuesta al cliente

      response.render('../views/permissions', {
        adminUsers,
        bills,
        patients,
        statistics
      });
      
    } catch (error) {
      console.error(error);
      response.status(500).render("500");
    }
  };
  
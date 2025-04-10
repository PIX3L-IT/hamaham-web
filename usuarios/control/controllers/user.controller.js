const admin = require('../../../config/firebase');
const { Types } = require('mongoose');


exports.getLogin = async (req, res, next) => {
	try {
		const users = await req.app.service('/api/usuario').find({
			headers: {
				cookie: req.headers.cookie
			}
		})
		res.render('login', {
			apiKey: process.env.API_KEY,
			authDomain: process.env.AUTH_DOMAIN,
			projectId: process.env.PROJECT_ID,
			storageBucket: process.env.STORAGE_BUCKET,
			messagingSenderId: process.env.MESSAGING_SENDER_ID,
			appId: process.env.APP_ID,
			error: '',
		})
	} catch(error) {
		console.log("[GET_LOGIN]", error.message);
		res.send(error.message);
	}
}

exports.getSignUp = async (req, res, next) => {
	try {
		const users = await req.app.service('/api/users').find({
			headers: {
				cookie: req.headers.cookie
			}
		})
		res.render('signup');
	} catch(error) {
		console.log("[GET_REGISTRAR]", error.message)
	}
}

exports.postLogin = async (req, res, next) => {
	try {
		// Función para iniciar sesión con Firebase
		const { token, email } = req.body;
        const firebaseID = await admin.auth().verifyIdToken(token);

		const expiresIn = 60 * 60 * 1000; // 1 hora (en milisegundos);
		const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn });

		res.cookie('session', sessionCookie, {
			maxAge: expiresIn,
			httpOnly: true,
			secure: false
		})

		res.send('Éxito al iniciar sesión');
	} catch(error) {
		console.log("[POST_LOGIN]", error.message)
		res.render('login', {
			error: 'Error al iniciar sesión'
		})
	}
}

exports.postSignUp = async (req, res, next) => {
	try {
		const { token, userId, email, name } = req.body;
        const firebaseID = await admin.auth().verifyIdToken(token);
		
		const expiresIn = 60 * 60 * 1000; // 1 hora (en milisegundos);
		const sessionCookie = await admin.auth().createSessionCookie(token, { expiresIn });

		res.cookie('session', sessionCookie, {
			maxAge: expiresIn,
			httpOnly: true,
			secure: false
		})

		res.send('Éxito registrando usuario');

	} catch(error) {
		console.log("[POST_REGISTRAR]", error.message)
		res.sent(error.message);
	}
}

exports.getPermissions = async (request, response, next) => {
    try {
        // Llama al servicio Feathers para obtener todos los users
        const permissions = await request.app.service('api/permissions').find();
        response.status(200).json({ message: "Permisos: ", permissions: permissions });
  } catch (error) {
        console.error(error.message);
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
      console.error(error.message);
      response.status(500).render("500");
    }
  };
  

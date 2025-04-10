const admin = require('../../../config/firebase');
const { ObjectId } = require('mongodb');


exports.getLogin = async (req, res, next) => {
	try {
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
		res.send(error.message);
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
		const PERMISSION_IDS = {
			adminUsers: new ObjectId("67f468d759e0643dcf3ecb6c"),
			bills: new ObjectId("67f469e559e0643dcf3ecb6d"),
			patients: new ObjectId("67f469f459e0643dcf3ecb6e"),
			statistics: new ObjectId("67f46a0559e0643dcf3ecb6f"),
		  };
      const firebaseUID = request.params.firebaseUID;
      const result = await request.app.service('api/users').find({
		headers: {
			cookie: request.headers.cookie
		},
        query: {
          firebaseUID: firebaseUID,
          $limit: 1
        }
      });
	  if (result.length === 0) {
		return response.status(404).send('Usuario no encontrado');
	  }
      //id = result[0]._id
	  const adminUsers = result[0].permissions.some(p => p.equals(PERMISSION_IDS.adminUsers));
	  const bills = result[0].permissions.some(p => p.equals(PERMISSION_IDS.bills));
	  const patients = result[0].permissions.some(p => p.equals(PERMISSION_IDS.patients));
	  const statistics = result[0].permissions.some(p => p.equals(PERMISSION_IDS.statistics));
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
  

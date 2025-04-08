const admin = require('../../../firebase');


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
		console.log("[GET_LOGIN]", error)
	}
}

exports.getSignUp = async (req, res, next) => {
	try {
		res.render('signup')
	} catch(error) {
		console.log("[GET_REGISTRAR]", error)
	}
}

exports.postLogin = async (req, res, next) => {
	try {
		// Función para iniciar sesión con Firebase
		const idToken = req.headers.authorization?.split('Bearer ')[1];

		if (!idToken) {
			return res.status(400).send('Error al iniciar sesión: No hay Token');
		}

		const decodedToken = await admin.auth().verifyIdToken(idToken);
		const uid = decodedToken.uid;

		console.log("Token verified. UID:", uid);
		res.send('Éxito al iniciar sesión');
	} catch(error) {
		console.log("[POST_LOGIN]", error)
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

	} catch(error) {
		console.log("[POST_REGISTRAR]", error)
	}
}
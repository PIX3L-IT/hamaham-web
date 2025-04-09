const admin = require('../../../firebase');


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
		console.log("[GET_LOGIN]", error)
		res.send(error.message);
	}
}

exports.getSignUp = async (req, res, next) => {
	try {
		res.render('signup');
	} catch(error) {
		console.log("[GET_REGISTRAR]", error)
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

		res.send('Éxito registrando usuario');

	} catch(error) {
		console.log("[POST_REGISTRAR]", error)
		res.sent(error.message);
	}
}
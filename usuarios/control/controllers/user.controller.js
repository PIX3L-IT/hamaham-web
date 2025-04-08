const admin = require('../../../firebase');


exports.getLogin = async (req, res, next) => {
	try {
		res.render('login')
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

// exports.postLogin = async (req, res, next) => {
// 	try {
// 		const auth = getAuth(app);
// 		// Función para iniciar sesión con Firebase
// 		signInWithEmailAndPassword(auth, req.body.email, req.body.password)
// 		  .then((userCredential) => {
// 		    // Signed in 
// 		    const user = userCredential.user;
//             console.log("Exito");
// 			res.send('Éxito en Login');
// 		  })
// 		  .catch((error) => {
// 		    const errorCode = error.code;
// 		    const errorMessage = error.message;
//             console.log('Login:', errorMessage);
// 			res.send('Error al hacer login');
// 		  });
// 	} catch(error) {
// 		console.log("[POST_LOGIN]", error)
// 	}
// }

exports.postSignUp = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await admin.auth().createUser({
			email,
			password
		});

		console.log('Usuario creado:', user.email);
		res.send('Éxito con registro');
	} catch(error) {
		console.log("[POST_REGISTRAR]", error)
	}
}
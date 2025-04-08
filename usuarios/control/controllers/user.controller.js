const { app } = require('../../../firebase');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("@firebase/auth");


exports.getLogin = async (req, res, next) => {
	try {
		res.render('login_test')
	} catch(error) {
		console.log("[GET_LOGIN]", error)
	}
}

exports.getSignUp = async (req, res, next) => {
	try {
		res.render('registrar_test')
	} catch(error) {
		console.log("[GET_REGISTRAR]", error)
	}
}

exports.postLogin = async (req, res, next) => {
	try {
        console.log(req.body);
		const auth = getAuth(app);
		// Función para iniciar sesión con Firebase
		signInWithEmailAndPassword(auth, req.body.email, req.body.password)
		  .then((userCredential) => {
		    // Signed in 
		    const user = userCredential.user;
		    // ...
            console.log("Exito");
		  })
		  .catch((error) => {
		    const errorCode = error.code;
		    const errorMessage = error.message;
            console.log('Login:', errorMessage);
		  });
	} catch(error) {
		console.log("[POST_LOGIN]", error)
	}
}

exports.postSignUp = async (req, res, next) => {
	try {
		const auth = getAuth(app);
		// Función para registrar usuario en base de datos de firebase
		createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
            .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log("Éxito con registro");
            // ...
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Registrar:', errorMessage);
            // ..
            });
	} catch(error) {
		console.log("[POST_REGISTRAR]", error)
	}
}
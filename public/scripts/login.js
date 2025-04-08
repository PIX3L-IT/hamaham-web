import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
    import { app } from "/scripts/firebase-init.js"

    const auth = getAuth(app);
    const Form = document.getElementById('loginForm');

    Form.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

            const user = signInWithEmailAndPassword(auth, email, password)
            .then((userData) => {
                const idToken = userData._tokenResponse.idToken;

                fetch('/usuario/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${idToken}`
                    },
                    body: JSON.stringify({ email, password })
                }).then((response) => response.text())
                .then((data) => {
                    console.log(data)
                    document.getElementById('msg').innerHTML = data;
                });
                
            })
            .catch((error) => {
                document.getElementById('msg').innerHTML = "Error al iniciar sesión" + error.message
                console.log("Error", error.message);
            });
        })
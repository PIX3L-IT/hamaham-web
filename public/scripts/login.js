import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
    import { app } from "/scripts/firebase-init.js"

    const auth = getAuth(app);
    
    document.addEventListener('DOMContentLoaded', async (event) => {
        
        const Form = document.getElementById('loginForm');
        async function login(event){
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const tokenField = document.getElementById('token');
    
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                    const token = await userCredential.user.getIdToken();
                    tokenField.value = token;
                    Form.submit();
                } catch (error) {
                    console.log(error);
                }

        }
        Form.addEventListener('submit', login);
    });
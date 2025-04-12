import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { app } from "/scripts/firebase-init.js"

const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {

    const Form = document.getElementById('signupForm');
    async function createUser(event){
        event.preventDefault();
    
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const tokenField = document.getElementById('token');
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            tokenField.value = token;
            Form.submit();
        } catch (error){
            console.log(error.message);
        }
    }
    Form.addEventListener('submit', createUser);
})
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

const firebaseConfig = {
    apiKey: 'AIzaSyAYwLmaTiNbqDV65M1Q8XtSotmWxr6WOPo',
    authDomain: 'hama-ham-testing.firebaseapp.com',
    projectId: 'hama-ham-testing',
    storageBucket: 'hama-ham-testing.firebasestorage.app',
    messagingSenderId: '54172109093',
    appId: '54172109093:web:4dedda4ca70b2a9e33b2cc'
};

export const app = initializeApp(firebaseConfig);
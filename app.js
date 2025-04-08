const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

const connectDB = require('./config/mongoose');
const dotenv = require("dotenv").config()

// Cargar variables de entorno
require('dotenv').config();

// Conectar a MongoDB
connectDB();

app.set('view engine', 'ejs');

// Configurar el motor de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'usuarios', 'views'),
  path.join(__dirname, 'facturas', 'views')
]);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get("/test", (req, res) => {
    res.send("testing testing levi fanpage");
});

// Rutas de la aplicación
const clientsRoutes = require('./facturas/control/routes/clients.routes');
const pacientesRoutes = require('./pacientes/control/routes/activity.routes');

app.use("/usuario", require("./usuarios/control/routes/user.routes")); // Ahora montado en /usuario
app.use('/clientes', clientsRoutes);         // Ahora montado en /facturama
app.use('/pacientes', pacientesRoutes);      // Ahora montado en /pacientes

// Redirección opcional si alguien entra a /
app.get('/', (req, res) => {
  res.redirect('/pacientes/add-patient');
});

app.get('/js/firebase-config.js', (req, res) => {
  res.type('application/javascript');
  res.render('js/firebase-config', {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
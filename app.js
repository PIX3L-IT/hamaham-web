const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const { rest } = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const { cors, json, urlencoded, notFound, errorHandler } = require('@feathersjs/express');

const path = require('path');
const bodyParser = require('body-parser');
const compression = require('compression');
const axios = require('axios');

const app = express(feathers());

app.configure(configuration());

const { mongooseConfig } = require('./config/mongoose');
const dotenv = require("dotenv").config()

// Cargar variables de entorno
require('dotenv').config();

// Configurar el motor de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'usuarios', 'views'),
  path.join(__dirname, 'facturas', 'views')
]);

// Middlewares básicos
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Compresión
app.use(compression());

app.configure(mongooseConfig);

// Configurar Feathers REST
app.configure(rest());

const { usuarioService } = require('./usuarios/control/services/user.service');

// Hooks globales de Feathers 
app.hooks({
  around: {
    all: {},
  },
  before: {},
  after: {},
  error: {}
});


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

module.exports = app;
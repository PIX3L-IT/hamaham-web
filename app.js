const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config', 'environments');
process.env.NODE_ENV = 'stage';
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const { rest } = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const { cors, json, urlencoded, notFound, errorHandler } = require('@feathersjs/express');

const helmet = require('helmet');

const bodyParser = require('body-parser');
const compression = require('compression');
const axios = require('axios');

const methodOverride = require('method-override');

const app = express(feathers());

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      "script-src": ["'self'", 'www.gstatic.com'],
      "connect-src": ["'self'", 'securetoken.googleapis.com', 'identitytoolkit.googleapis.com']
    },
  },
}));

app.configure(configuration());

const { logger } = require('./config/logger');
const { firebaseHook } = require('./usuarios/control/hooks/firebase-auth');
const { logError } = require('./hooks/log-error');
const { mongooseConfig } = require('./config/mongoose');
const dotenv = require("dotenv").config()

// Cargar variables de entorno
require('dotenv').config();

// Configurar el motor de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'usuarios', 'views'),
  path.join(__dirname, 'pacientes', 'views'),
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

// Method Override
app.use(methodOverride('_method'));

// Conecta Mongoose
app.configure(mongooseConfig);

// Configura Feathers REST (crea endpoints /serviceName)
app.configure(rest());

const { services } = require('./util/index.services');
app.configure(services);

// Hooks globales de Feathers 
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
});

const patientsSession = require('./pacientes/control/routes/patients.routes');
app.use('/patients', patientsSession);
const userSession = require('./usuarios/control/routes/user.routes');
app.use('/users', userSession);
const clientsRoutes = require('./facturas/control/routes/clients.routes');
app.use('/clientes', clientsRoutes);
const pacientesRoutes = require('./pacientes/control/routes/activity.routes');
app.use('/pacientes', pacientesRoutes); 

// Redirección opcional si alguien entra a /
app.get('/', (req, res) => {
  res.redirect('/pacientes/add-patient');
});

app.get('/js/firebase-config.js', (req, res, next) => {
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

// Manejo de 404 y errores
app.use(notFound());
app.use(errorHandler({ logger }));


module.exports = app;
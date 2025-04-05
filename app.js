const path = require('path');
process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config', 'environments');
process.env.NODE_ENV = 'stage';
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const { rest } = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const { cors, json, urlencoded, notFound, errorHandler } = require('@feathersjs/express');

const bodyParser = require('body-parser');
const compression = require('compression');

// Archivos locales
const { logger } = require('./config/logger');
const { logError } = require('./pacientes/control/hooks/log-error');
const { mongooseConfig } = require('./config/mongoose');

// Crea la app Feathers basada en Express
const app = express(feathers());

// Carga la configuración desde config/default.json

app.configure(configuration());

// Configura EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './pacientes/views'));

// Middlewares básicos
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Body-parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '..', 'public')));

// Compresión
app.use(compression());

// Conecta Mongoose
app.configure(mongooseConfig);

// Configura Feathers REST (crea endpoints /serviceName)
app.configure(rest());

const { patientService } = require('./pacientes/control/services/service');
app.configure(patientService);

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

// Manejo de 404 y errores
app.use(notFound());
app.use(errorHandler({ logger }));

module.exports = app;
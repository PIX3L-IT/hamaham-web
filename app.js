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
const { logError } = require('./shared/hooks/log-error');
const { mongooseConfig } = require('./config/mongoose');

// Cargar variables de entorno
require('dotenv').config();

// Configurar el motor de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', [
  path.join(__dirname, 'shared', 'components'),
  path.join(__dirname, 'usuarios', 'views'),
  path.join(__dirname, 'pacientes', 'views'),
  path.join(__dirname, 'facturas', 'views'),
  path.join(__dirname, 'clinica', 'views')
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

//Middleware: determina enlace activo
app.use((req, res, next) => {
  let key = 'home';           // por defecto no resalta nada en el sidebar (home no está en el sidebar)

  if      (req.path.startsWith('/pacientes'))       key = 'patients';
  else if (req.path.startsWith('/facturas') ||
           req.path.startsWith('/clientes'))       key = 'invoices';
  else if (req.path.startsWith('/estadisticas'))   key = 'stats';
  else if (req.path.startsWith('/usuarios'))       key = 'users';

  res.locals.activeRoute = key; /* disponible en TODAS las vistas */
  next();
});

// Conecta Mongoose
app.configure(mongooseConfig);

// Configura Feathers REST (crea endpoints /serviceName)
app.configure(rest());

const { patientService } = require('./pacientes/control/services/patient.service');
app.configure(patientService);
const { userService } = require('./usuarios/control/services/user.service');
app.configure(userService);
const { permissionService } = require('./usuarios/control/services/permission.service');
app.configure(permissionService);

// Hooks globales de Feathers 
app.hooks({
  around: {
    all: [logError]
  },
  before: {},
  after: {},
  error: {}
});

const patientsRoutes = require('./pacientes/control/routes/patients.routes');
app.use('/pacientes', patientsRoutes);
const userRoutes = require('./usuarios/control/routes/user.routes');
app.use('/usuarios', userRoutes);
const clientsRoutes = require('./facturas/control/routes/clients.routes');
app.use('/clientes', clientsRoutes);
const clinicRoutes = require('./clinica/control/routes/clinica.routes');
app.use('/clinica', clinicRoutes);


// Redirección opcional si alguien entra a /
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Ruta de visualización de componentes gráficos
app.get('/test/components', (req, res) => {
  res.render('testAll');
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
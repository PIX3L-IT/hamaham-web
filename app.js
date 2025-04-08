const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const connectDB = require('./config/mongoose');

// Cargar variables de entorno
require('dotenv').config();

// Conectar a MongoDB
connectDB();

// Configurar el motor de vistas y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'facturas', 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la aplicación
const clientsRoutes = require('./facturas/control/routes/clients.routes');
const pacientesRoutes = require('./pacientes/control/routes/activity.routes');

app.use('/clientes', clientsRoutes);         // Ahora montado en /clientes
app.use('/pacientes', pacientesRoutes);      // Ahora montado en /pacientes

// Redirección opcional si alguien entra a /
app.get('/', (req, res) => {
  res.redirect('/pacientes/add-patient');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

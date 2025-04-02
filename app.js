const express = require('express');
const app = express();
const connectDB = require('./config/mongoose');

connectDB();

// Importante para que funcione req.body (formularios POST)
app.use(express.urlencoded({ extended: true }));

// Importar y montar tus rutas
const testRoutes = require('./pacientes/control/routes/activity.routes');
app.use('/', testRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

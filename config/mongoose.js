const mongoose = require('mongoose');

function mongooseConfig (app) {
    // Obtén la cadena de conexión desde la config de Feathers
  const connectionString = 'mongodb://localhost:27018/develop'; 

  // Conecta Mongoose
  mongoose.connect(connectionString)
    .then(() => {
      console.log('Conexión establecida con MongoDB via Mongoose');
    })
    .catch(err => {
      console.error('Error al conectar con MongoDB', err);
    });

  // Si quieres acceder a la instancia en otras partes vía app:
  app.set('mongooseClient', mongoose);
};

module.exports = {
  mongooseConfig
};
<<<<<<< HEAD
const mongoose = require("mongoose");

function mongooseConfig(app) {
  // Obtén la cadena de conexión desde la config de Feathers
  const connectionString = app.get('mongodb'); 
=======
const mongoose = require('mongoose');

function mongooseConfig (app) {
    // Obtén la cadena de conexión desde la config de Feathers
  const connectionString = 'mongodb://localhost:27018/develop'; 
>>>>>>> fa67730e415da2876e382485686d85567ecb9749

  // Conecta Mongoose
  mongoose.connect(connectionString)
    .then(() => {
      console.log('Conexión establecida con MongoDB via Mongoose');
    })
    .catch(err => {
<<<<<<< HEAD
      console.error('Error al conectar con MongoDB', err.message);
=======
      console.error('Error al conectar con MongoDB', err);
>>>>>>> fa67730e415da2876e382485686d85567ecb9749
    });

  // Si quieres acceder a la instancia en otras partes vía app:
  app.set('mongooseClient', mongoose);
};

module.exports = {
  mongooseConfig
};
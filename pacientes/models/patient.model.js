const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  IdPatient: { type: String, required: true, unique: true },
  Name: String,
  Email: String,
  Phone: Number
});

module.exports = mongoose.model('Patient', patientSchema, 'patient'); // Tercer argumento fija el nombre exacto de la colección

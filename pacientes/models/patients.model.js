const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    IdPatient: { type: String },
    Email: { type: String, required: true },
    Name: { type: String }
  },
  {
    collection: "patient",
  }
);

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
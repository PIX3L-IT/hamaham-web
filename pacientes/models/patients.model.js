const MOONGOOSE = require("mongoose");

/*
  Creamos el modelo de lo que seran los datos clínicos de los pacientes
  de Mariela 
  
  Esto lo hacemos para que el body sepa lo que tiene que recibir y como
  lo tiene que guardar en la base de datos
*/

const PATIENT_SCHEMA = new MOONGOOSE.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String },
    Phone: { type: Number},
    Registration_Date: { type: Date, default: Date.now },
    Religion: { type: String },
    Marital_Status: { type: String },
    Occupation: { type: String },
    Education: { type: String },
    Emergency_Contact: { type: String },
    Weight: { type: Number },
    Height: { type: Number },
    Date_of_Birth: { type: Date },
    Reason_for_Consultation: { type: String },
    
    Pathological_Antecedents: { 
      Systematic_Diseases: { type: String },
      Surgical_Antecedents: { type: String },
      Hospitalizations: { type: String },
      Pregnancies: { type: String },
      Musculoskeletal_Problems: { type: String },
      Transfusions: { type: String },
      Allergies: { type: String },
    },

    Non_Pathological_Antecedents: {
      Alcohol: { type: String },
      Other_Substances: { type: String },
      Food: { type: String },
      Hidration: { type: String },
      Physical_Activity: { type: String },
      Laboral_Activity: { type: String },
      Sleep: { type: String },
      Stress: { type: String },
    },

    Family_History:{
      Arterial_Hypertension: { type: String },
      Diabetes: { type: String },
      Cancer: { type: String },
      Acute_Myocardial_Infarction: { type: String },
      Cerebrovascular_Accident: { type: String },
      Viral_Respiratory_Infections: { type: String },
      Thyroid_Disease: { type: String },
      Rheumatoid_Arthritis_Lupus: { type: String },
      Neuromuscular_Disorders: { type: String },
      Down_Syndrome: { type: String },
      Mental_Disorders: { type: String },
      Other: { type: String },
    }
},
  {
    collection: "patient",
  }
);

const PATIENT = MOONGOOSE.model("patient", PATIENT_SCHEMA);

module.exports = PATIENT;
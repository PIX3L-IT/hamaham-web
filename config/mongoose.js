const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27018/develop'; 

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI); 
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
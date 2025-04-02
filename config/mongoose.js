const mongoose = require('mongoose');

const dbURI = 'mongodb://127.0.0.1:27017/develop'; 

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB local (develop)');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
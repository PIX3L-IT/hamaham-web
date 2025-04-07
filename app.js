const express = require('express');
const path = require("path");
const axios = require('axios');
const pacientesRoutes = require('./pacientes/control/routes/activity.routes');
const app = express();
const connectDB = require('./config/mongoose');

require("dotenv").config();
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'facturas', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", require('./facturas/control/routes/clients.routes'));


app.use('/', pacientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
const express = require('express');
const path = require("path");
const axios = require('axios');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pacientes', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", require('./pacientes/control/routes/clientes.routes'));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})
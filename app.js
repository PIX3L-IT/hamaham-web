const express = require('express');
const path = require("path");
const axios = require('axios');
require("dotenv").config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'facturas', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("", require('./facturas/control/routes/clients.routes'));

app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
})
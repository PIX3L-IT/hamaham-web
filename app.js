const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // ⬅️ Aquí

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts); // ⬅️ Usa layouts
app.set('layout', 'layout'); // ⬅️ Define layout por default

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/pacientes', (req, res) => {
    res.render(path.join(__dirname, 'pacientes/views/homepage.ejs'), {
      layout: 'layout',
      pageTitle: 'Pacientes'
    });
  });

app.get('/', (req, res) => {
  res.redirect('/pacientes');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

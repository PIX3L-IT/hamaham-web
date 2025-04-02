const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts); 
app.set('layout', 'layout'); 

app.use(express.static(path.join(__dirname, 'public')));

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

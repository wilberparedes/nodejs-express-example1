const express = require('express');
const app = express();
require('./routes')(app);
const port = 3000;

app.get('/', (req, res) => {
  //response send to client
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola una nueva ruta');
});

app.listen(port, () => {
  console.log(`I am ejecuting in port ${port}`);
});

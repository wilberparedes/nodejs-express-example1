const express = require('express');

const app = express();
app.use(express.json());
require('./routes')(app);
const { logErrors, errorHandler } = require('./middlewares/error.handler');

/** los middleware de errores se deben de importar después de las rutas */
const port = 3000;

app.get('/', (req, res) => {
  //response send to client
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola una nueva ruta');
});

/**
 * en este orden se ejecutará
 * el uno detrás del otro
 */
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`I am ejecuting in port ${port}`);
});

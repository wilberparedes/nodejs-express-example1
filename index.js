const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = 3000;

const whitelist = ['http://127.0.0.1:5500', 'http://ejemplodedominio.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido jaja'));
    }
  },
};
app.use(express.json());
app.use(cors(options));

app.get('/', (req, res) => {
  //response send to client
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola una nueva ruta');
});

/** los middleware de errores se deben de importar después de las rutas */
routerApi(app);

/**
 * en este orden se ejecutará
 * el uno detrás del otro
 */
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`I am ejecuting in port ${port}`);
});

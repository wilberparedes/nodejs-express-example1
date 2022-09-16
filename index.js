const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  //response send to client
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola una nueva ruta');
});

//dos parametros por URL
app.get('/categories/:categoryID/products/:productID', (req, res) => {
  const { categoryID, productID } = req.params;
  res.json({
    categoryID,
    productID,
  });
});

/* users - obtener query params
 * http://localhost:3000/users?limit=10&offset=200
 * data fake: npm i faker@5.5.3 -S
 */
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;

  if (limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('There are not params');
  }
});

//TODO: clients
const CLIENTS = [
  {
    id: 1,
    name: 'client 1',
    country: 'Colombia',
    city: 'Soledad',
    age: '35 years old',
  },
  {
    id: 2,
    name: 'client 2',
    country: 'Colombia',
    city: 'Barranquilla',
    age: '30 years old',
  },
  {
    id: 3,
    name: 'client 3',
    country: 'Colombia',
    city: 'Malambo',
    age: '28 years old',
  },
];
app.get('/clients', (req, res) => {
  res.json(CLIENTS);
});

app.get('/clients/:clientID', (req, res) => {
  const { clientID } = req.params;
  const getClient = CLIENTS.find((client) => client.id === Number(clientID));
  if (getClient) {
    res.json(getClient);
  } else {
    res.json({ success: false, message: 'User not found' });
  }
});

routerApi(app);

app.listen(port, () => {
  console.log(`I am ejecuting in port ${port}`);
});

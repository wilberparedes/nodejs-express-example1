//TODO: generando router especificos
const express = require('express');
const faker = require('faker');

/** creando routing propio */
const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = [];
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});

/** TODO LO ESPECIFICO DEBE IR ANTES DE LO QUE ES DINAMICO
 * ESPECITICO ->
 */
router.get('/filter', (req, res) => {
  res.send('I am filter');
});

/** ENDPOINT DINÁMICO */
router.get('/:id', (req, res) => {
  console.log('req.params', req.params);
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 2000,
  });
});

/** WRONG!!!
 * DEBE IR ARRIBA DEL DINÁMICO
 * PARA QUE FUNCIONE
 */
router.get('/filter', (req, res) => {
  res.send('I am filter');
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created',
    data: body,
  });
});

module.exports = router;

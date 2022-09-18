//TODO: generando router especificos
const express = require('express');
const ProductsService = require('../service/products.service');

/** creando routing propio */
const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
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
  const { id } = req.params;
  const product = service.findOne(id);
  if (!product) {
    res.status(404).json({
      message: 'product not found',
      success: false,
    });
  } else {
    res.status(200).json(product);
  }
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
  res.status(201).json({
    message: 'created',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});

module.exports = router;

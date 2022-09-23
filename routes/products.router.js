//TODO: generando router especificos
const express = require('express');
const ProductsService = require('../service/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schemas');

/** creando routing propio */
const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

/** TODO LO ESPECIFICO DEBE IR ANTES DE LO QUE ES DINAMICO
 * ESPECITICO ->
 */
router.get('/filter', (req, res) => {
  res.send('I am filter');
});

/** ENDPOINT DINÁMICO */
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    // const { id } = req.params;
    // const product = await service.findOne(id);
    // if (!product) {
    //   res.status(404).json({
    //     message: 'product not found',
    //     success: false,
    //   });
    // } else {
    //   res.status(200).json(product);
    // }
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      // de esta manera ejecutamos el middleware de forma explicita
      next(error);
    }
  }
);

/** WRONG!!!
 * DEBE IR ARRIBA DEL DINÁMICO
 * PARA QUE FUNCIONE
 */
router.get('/filter', (req, res) => {
  res.send('I am filter');
});

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id,
  });
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await service.delete(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

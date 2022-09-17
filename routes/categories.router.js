const express = require('express');

const router = express.Router();

//dos parametros por URL
router.get('/:categoryID/products/:productID', (req, res) => {
  const { categoryID, productID } = req.params;
  res.json({
    categoryID,
    productID,
  });
});

module.exports = router;


const express = require('express');
const router = express.Router();
const productController = require('../controller/product_controller');

router.post('/create',productController.createProduct);
router.get('/get-all-product',productController.getAllProducts);
router.get('/get-product/:id',productController.getProduct);
router.delete('/delete-product/:id',productController.deleteProduct);
router.put('/update-product/:id',productController.updateProduct);
router.post('/:id/add-variants',productController.addVariantsToProduct);
router.get('/search/:query',productController.searchProduct);

module.exports = router;
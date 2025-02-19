const express = require('express');
const { getAllProducts, createProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/admin/products', createProduct);
router.delete('/admin/products/:id', deleteProduct);

module.exports = router;

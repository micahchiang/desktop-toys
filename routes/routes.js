var express = require('express');
var router = express.Router();
var productController = require('../controllers/generate_product.controller');

router.get('/', productController.productGenerate);

module.exports = router;
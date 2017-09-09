var express = require('express');
var productController = require('../controllers/generate_product.controller');
var router = express.Router();

router.get('/', productController.productGenerate);

module.exports = router;
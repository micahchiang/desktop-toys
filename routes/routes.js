var express = require('express');
var router = express.Router();
var productController = require('../controllers/generate_product.controller');

// router.get('/', (req,res) => {
//     res.render('../views/index');
// });

router.post('/', productController.productGenerate);

module.exports = router;

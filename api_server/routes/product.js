const express = require("express"); 
const router = express.Router(); 
const controllerProduct = require('../controllers/product');


router.get('/product', controllerProduct.getAllProducts); 
router.get('/product/:id', controllerProduct.getProductById); 
// router.get('/product/:categoryId', controllerProduct.getProductsByCategoryId); 
// router.post('/product', controllerProduct.addProduct); 
// router.put('/product', controllerProduct.updateProduct); 
router.delete('/product:/id', controllerProduct.deleteProductById);

module.exports = router;
const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productController')


//Get a list of all product
router.get('/', ProductController.getAllProducts);



//Create a new product
router.post('/', ProductController.createNewProduct );

//Get a product by id
router.get('/:id', ProductController.findProductById);

//Update a product bu id
router.patch('/:id', ProductController.updateAproduct );

//delete a product by id
router.delete('/:id', ProductController.deleteAproduct )

module.exports = router;
const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProduct,
    createProduct,
    searchProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:productID', getProduct);
router.post('/', createProduct);
router.get('/search/:keyword', searchProduct);


module.exports = router;
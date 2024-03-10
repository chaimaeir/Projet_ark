const express = require('express');
const router = express.Router();

const {
    getProducts,
    getProduct,
    createProduct,
    searchProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:productID', getProduct);
router.post('/', createProduct);
router.get('/search/:keyword', searchProduct);
router.put('/update/:productID', updateProduct);
router.delete('/delete/:productID', deleteProduct);



module.exports = router;
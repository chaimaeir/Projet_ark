const product = require('../models/Product');

const getProducts = ((req,res) => {
    const products = product
        .find()
        .then(()=>res.status(200).send(products))
        .catch((err)=>res.status(404).json({message : err}));
});

const getProduct = ((req,res)=>{
    const id = req.params.productID;
    product
        .findOne({"_id" : ObjectId(id) })  
        .then(()=>res.status(200).json({product: product}))   
        .catch((err)=>res.status(404).json({message : err})); 
});

const createProduct = ((req, res) => {
    const newProduct = new product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity
    })
    newProduct
        .save()
        .then(()=>res.status(200).json({message: 'product added to database'}))   
        .catch((err)=>res.status(404).json({message : err})); 
});

module.exports = {
    getProducts,
    getProduct,
    createProduct
}

    


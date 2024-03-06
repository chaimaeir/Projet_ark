const product = require('../models/Product');
var ObjectId = require('mongodb').ObjectId; 


const getProducts = ((req,res) => {
     product
        .find()
        .then((result)=>res.status(200).send(result))
        .catch((err)=>res.status(404).json({message : err}));
});

const getProduct = (async (req,res)=>{
    const id = req.params.productID;
    try {
        const result = await product.findOne({"_id" : new  ObjectId(id) })  
            if(result) {
                res.status(200).json({ product: result });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }   
    } catch (error) {
        res.status(500).json({message : error.message})
    }
    
});

const createProduct = ((req, res) => {
    const newProduct = new product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category,
        quantity: req.body.quantity
    })
    newProduct
        .save()
        .then(()=>res.status(200).json({message: 'product added to database'}))   
        .catch((err)=>res.status(404).json({message : err.message})); 
});

const searchProduct = ((req,res)=>{
    product.aggregate([
        {
        $search: {
            index: 'default',
            text: {
              query: req.params.keyword,
              path: ["name", "category"]
            }
          }
        }]).then((result)=>{
            if(result.length > 0)
                res.status(200).json({product : result});
            else
                res.status(404).json({message : 'product not found'})
        }).catch((err)=>{
            res.status(500).json({message : err.message});
        });
    
});
 
const updateProduct = ((req,res)=>{
    const id = req.params.productID;
    product
        .findOneAndUpdate({"_id" : new  ObjectId(id) },{$set: {quantity: req.body.quantity}})
        .then((result)=>res.status(200).json({message : result}))
        .catch((err)=>res.status(500).json({message : err.message}))
});

const deleteProduct = ((req,res)=>{
    const id = req.params.productID;
    product
        .findOneAndDelete({"_id" : new  ObjectId(id) })
        .then((result)=>{
            if(result)
                res.status(200).json({message : 'product deleted'});
            else
                res.status(404).json({message: 'product not found'})})
        .catch((err)=>res.status(500).json({message : err.message}))
});

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    searchProduct,
    updateProduct,
    deleteProduct
}
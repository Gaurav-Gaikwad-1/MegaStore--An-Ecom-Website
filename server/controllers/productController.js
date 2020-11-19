const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({})
    res.json(products)
})


// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async(req,res) => {
    // Product.findById(req.params.id)    //req.params.id will give u the id from url
    //     .exec()
    //     .then(product => {
    //         res.status(200).json(product) })
    //     .catch(err => {
    //         res.status(500).json({
    //             message: "Product Not Found",
    //             error: err
    //         })
    //     })
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

module.exports = { getProducts,getProductById }



//1.U can get error 'TypeError: Converting circular structure to JSON in nodejs' when u forget to put 'await' for a promise
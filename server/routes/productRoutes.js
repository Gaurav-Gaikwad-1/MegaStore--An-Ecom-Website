const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/' , asyncHandler(async(req,res) => {                                  //asyncHandler is used as middleware instead of using try-catch block to handle errors
    const products = await Product.find({})
    throw new Error('some error')
    res.json(products)
}))

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
router.get('/:id' , asyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)    //req.params.id will give u the id from url

    if(product){
        res.json(product);
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
}))

module.exports = router

//1.U can get error 'TypeError: Converting circular structure to JSON in nodejs' when u forget to put 'await' for a promise
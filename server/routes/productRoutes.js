const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get('/' , asyncHandler(async(req,res) => {                                  //asyncHandler is used as middleware instead of using try-catch block to handle errors
    const products = await Product.find({})
    //throw new Error('some error')
    res.json(products)
}))

// @desc    Fetch single products
// @route   GET /api/products/:id
// @access  Public
router.get('/:id' , (req,res) => {
    Product.findById(req.params.id)    //req.params.id will give u the id from url
        .exec()
        .then(product => {
            res.status(200).json(product) })
        .catch(err => {
            res.status(500).json({
                message: "some error occured while updating data",
                error: err
            })
        })
    
    // if(product){
       
    //     res.json(product);
    // }else{
    //     res.status(404)
    //     throw new Error('Product not found')
    // }
})

module.exports = router

//1.U can get error 'TypeError: Converting circular structure to JSON in nodejs' when u forget to put 'await' for a promise
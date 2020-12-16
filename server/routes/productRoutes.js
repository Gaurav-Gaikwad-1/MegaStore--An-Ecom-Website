const express = require('express')
const router = express.Router()
const { getProducts,getProductById } = require('../controllers/productController')




router.get('/',getProducts)              //router.route('/').get(getProducts) 
router.get('/:id',getProductById)  //router.route('/:id').get(getProductById) 




module.exports = router


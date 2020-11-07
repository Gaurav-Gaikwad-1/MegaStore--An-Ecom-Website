const express = require('express')
const { getProducts,getProductById } = require('../controllers/productController')
const router = express.Router()



router.route('/').get(getProducts)                             //router.get('/',getProducts)
router.route('/:id').get(getProductById)                         //router.get('/:id',getProductById)




module.exports = router


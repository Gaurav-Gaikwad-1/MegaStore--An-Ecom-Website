const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const products = require('./data/products')
const colors = require('colors')

const app = express()     

dotenv.config()

connectDB();

app.get('/' , (req,res) => {
    res.send('Apps Home page')
})

app.get('/api/products' , (req,res) => {
    res.json(products)
})
app.get('/api/products/:id' , (req,res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product);
})

const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold))
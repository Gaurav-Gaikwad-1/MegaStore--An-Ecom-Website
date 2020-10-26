const mongoose = require('mongoose')
const dotenv = require('dotenv')
const colors = require('colors')
const users = require('./data/users')
const products = require('./data/products')
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')

dotenv.config();

connectDB();

//to import data to db
const importData = async() => {
    try{
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return {
                ...product, user:adminUser
            }
        })

        await Product.insertMany(sampleProducts)
        console.log('Data Imported')
        process.exit()
    }
    catch(error){
        console.error(error);
        process.exit(1)
    }
}

//to delete data from db
const destroyData = async() => {
    try{
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        console.log('Data Destroyed')
        process.exit()
    }
    catch(error){
        console.error(error);
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}
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



// User.find({ email })                         //User.find({ email : email }) if both names are same we can use just one name
    //     .exec()
    //     .then(doc => {
    //         //check if email is present
    //         if (doc.length < 1) {
    //             res.status(400).json({
    //                 message: "User not registered",
    //                 error: "Email cannot be found"
    //             });
    //         } else {
    //             //check password match
    //             bcrypt.compare(password, doc[0].password, (err, result) => {
    //                 if (err) {
    //                     res.status(500).json({
    //                         message: "Internal server error",
    //                         error: err
    //                     })
    //                 }
    //                 if (result === true) {
    //                     //return response
    //                     res.status(200).json({
    //                         _id: user._id,
    //                         name: user.name,
    //                         email: user.email,
    //                         isAdmin: user.isAdmin,
    //                         token: generateToken(user._id)
    //                     })
    //                 } else {
    //                     res.status(400).json({
    //                         message: "Email and password combination doesnt match",
    //                         error: err
    //                     })
    //                 }
    //             })
        
    //        }
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             message: "internal server error",
    //             error: err
    //         });
    //     })
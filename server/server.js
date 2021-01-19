const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');
const {notFound,errorHandler} = require('./middleware/errorMiddleware');
var cors = require('cors');

dotenv.config();

const app = express(); 

app.use(cors());




//middleware
app.use(express.json())             //this allows to accept JSON data in the body
app.use(express.urlencoded({ extended: false }));  

//connection to database
connectDB();

//require routes handlers
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');

//routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal' ,(req,res) => {
    req.send(process.env.PAYPAL_CLIENT_ID);
})

app.get('/' , (req,res) => {
    res.send('Apps Home page');
})


app.use(notFound)
app.use(errorHandler)   


const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold));


//1.Always remember to put error Handler middleware at last after declaring every routes because it is to handle errors when particular route is not found so we have to put routes first
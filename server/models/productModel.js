const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    name :    { type:String, required:true },
    rating :  { type:Number, required:true },
    comment : { type:String, required:true },
},{
    timestamps:true
})
const productSchema = mongoose.Schema({
    user:{                                          //here we put user field bcoz we want to know which user or which admin created which product
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'                                     //here we need to reference a specific model for this obj id  so we add 'User' which adds relationship betn products & users  
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
    },
    brand:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true,                  
    },
    description:{
        type: String,
        required: true,                  
    },
    reviews:[reviewSchema],               //review will array of review objs so we will have separate reviewSchema for that & we can define it in other file but it is small & we use it her only so we define it here only
    rating:{
        type: Number,
        required: true, 
        default:0                 
    },
    numsReview:{
        type: Number,
        required: true,
        default:0                  
    },
    price:{
        type: Number,
        required: true,
        default:0                  
    },
    countInStock:{
        type: Number,
        required: true,
        default:0                  
    },
}, {
    timestamps:true
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product;
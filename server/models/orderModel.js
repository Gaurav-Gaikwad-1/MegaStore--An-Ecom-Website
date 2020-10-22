const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems:[                                                  //orderitems is array bcoz it will contain many items in cart for order
        {
            name: { type:String, required:true },
            qty: { type:Number, required:true },
            image: { type:String, required:true },
            price: { type:String, required:true },
            product: { 
                type:mongoose.Schema.Types.ObjectId, 
                required:true,
                ref: 'Product'
            }
        }
    ],
    shippingAddress:{
        address : { type:String , required:true },
        city : { type:String , required:true },
        postalCode : { type:Number , required:true },
        country : { type:String , required:true },

    },
    paymentMethod:{
        type: String,
        required: true
    },
    paymentResult:{
        type: String,
        required: true
    },
    paymentMethod:{                    //this data will be coming from  paypal after payment completion
        id : { type: String },
        status: { type: String },
        update_time : {type:String},
        email: { type:String }
    },
     paymentMethod:{
        type: String,
        required: true
    },
    paymentMethod:{
        type: String,
        required: true
    },
    taxPrice:{
        type: Number,
        required: true,
        default: 0.0                  
    },
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0                  
    },
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0                  
    },
    isPaid:{
        type: Boolean,
        required: true,
        default: false                  
    },
    paidAt:{
        type:Date
    },
    isDelivered:{
        type: Boolean,
        required: true,
        default: false   
    },
    deliveredAt:{
        type:Date
    },
}, {
    timestamps:true
})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order;
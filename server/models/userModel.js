const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false                  //default is false so when user registers,they're not admin
    },
}, {
    timestamps:true
})


userSchema.methods.matchPassword = async function(enteredPassword) {                    //this is function to check user has entered correct password while logIn which will be call from userController.js
    return bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',userSchema)

module.exports = User;
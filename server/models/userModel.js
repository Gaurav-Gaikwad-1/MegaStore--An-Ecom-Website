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

userSchema.pre('save', async function(next){
    //if the password is not changed then we do not have to encrpt the password again or it will unneccessary create the hash again
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);

})

const User = mongoose.model('User',userSchema)

module.exports = User;
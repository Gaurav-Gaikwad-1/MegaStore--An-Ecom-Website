const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

// @desc    Get user login & give token
// @route   POST  /api/users/login
// @access  Public
const authUser = asyncHandler(async(req,res) => {
    
    const {email,password} = req.body

    const user = await User.findOne({ email })              //find user by emailid     //await User.findOne({ email: email })

    if(user && user.matchPassword(password)){                //If user exists then check for password
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

module.exports = authUser

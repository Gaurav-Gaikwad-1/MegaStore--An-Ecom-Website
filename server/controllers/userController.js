const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/generateToken')

// @desc    Authenticate USer
// @route   GET /api/users/login
// @access  Public
const authUser = asyncHandler(async(req,res) => {
    const { email,password } = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: null
        })
    } else {
        res.status(400).json({
            message: "Email and password combination doesnt match"
        })
        // throw new Error('Invalid email or Password')
    }
    
})



module.exports = authUser
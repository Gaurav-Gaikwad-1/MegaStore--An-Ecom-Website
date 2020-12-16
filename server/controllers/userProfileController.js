const User = require("../models/userModel")
const asyncHandler = require('express-async-handler')

const userProfile = asyncHandler(async(req,res) =>  {
//    const user = await User.findById(req.user._id)

//    if(user){
//        res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             isAdmin: user.isAdmin
//        })
//    }else{
//        res.status(404)
//        throw new Error('user not found')
//    }
    res.send('success')
})

module.exports = userProfile  
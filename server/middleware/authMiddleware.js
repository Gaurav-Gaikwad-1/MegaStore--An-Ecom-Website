const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

exports.protect = asyncHandler(async(req,res,next) => {
    let token

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try{
            token = req.headers.authorization.split(' ')[1];     //req.headers.authorization.split(' ') ===>  ['Bearer','eyznjnxkdjlfnjkdnfjkdnfdndfdfdfd']
            // console.log(token);

            const decoded = jwt.verify(token,process.env.JWT_SECRET);    //decoded now contains ===> { id: '5f91d31d62e5fc46e8f6f0f5', iat: 1609829806, exp: 1612421806 }

            //console.log(decoded);
            req.user = await User.findById(decoded.id).select('-password');  //here we put all of user's data except password in this req.user which will have access to in all of our routes i.e protected routes

            

            next();
        } catch(error){
            res.status(400).send('Not Authorized, Token failed');
        }
    }

    if(!token){
        res.status(400).send('Not Authorized,no token');
    }
});


//1. select : specifies which document field to include or exclude 
//2.When we pass token we can get the user id associated with that token using JWT.verify() method then using that userId 
//  we can get the details of user & assigning it to request user & then we can use requested user in any protected route that we want 
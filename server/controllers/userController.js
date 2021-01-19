const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

// @desc    Get user login & give token
// @route   POST  /api/users/login
// @access  Public
exports.authUser = asyncHandler(async(req,res) => {
    
    const {email,password} = req.body;
    // if(!email || !password){
    //     res.status(400);
    //     throw new Error('NO username or password entered');
    // }

    const user = await User.findOne({ email })              //find user by emailid     //await User.findOne({ email: email })


 
    if(user && (await user.matchPassword(password))) {       //If user exists then check for password
        res.json({
            _id:user._id, 
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
        
    }else{
        res.status(404)
        throw new Error('Invalid Email or Password');
    }
    
    
})


// @desc    POST user registration
// @route   POST  /api/users
// @access  Public

//FOr registering user first we check if the email already exists or not if exists we throw an error
//Otherwise we create a new document in db with given details & we created a middleware for hashing password before saving it in db
exports.registerUser = asyncHandler(async(req,res) => {
    const {name,email,password} = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }
    //for hashing password we have created a middleware in User Model
    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id:user._id, 
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get active profiles
// @route   GET  /api/users/profile
// @access  Protected
exports.getUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.json({
            _id:user._id, 
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404).send('User not found');
    }
});

exports.updateUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id, 
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            // token: generateToken(updatedUser._id) 
        })
    }else{
        res.status(404)
        throw new Error('User not found');
    }
});


//---------------ADMIN----------------------------- 

// @desc    Get all users 
// @route   GET  /api/users/
// @access  Private/Admin
exports.getAllUsers = asyncHandler(async(req,res) => {
    const users = await User.find({});
    res.json(users);
});


// @desc    Delete user
// @route   DELETE  /api/users/:id
// @access  Private/Admin
exports.deleteUser = asyncHandler(async(req,res) => {
    const user = await User.findById( req.params.id ); 
    if(user){
        await user.remove();
        res.json({ message: 'User deleted'});
    }else{
        res.status(404)
        throw new Error('User not found');
    }
});

// @desc    Get User profiles
// @route   GET  /api/users/:id
// @access  Private/Admin
exports.getUserById = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).select('-password');

    if(user){
        res.json({
            _id:user._id, 
            name:user.name,
            email:user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404).send('User not found');
    }
});

exports.updateUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id, 
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User not found');
    }
});



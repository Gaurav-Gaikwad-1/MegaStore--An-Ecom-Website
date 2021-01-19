const express = require('express')
// const  userController = require('../controllers/userController')

const { authUser ,getUserProfile,registerUser,updateUserProfile,getAllUsers, deleteUser, getUserById, updateUser} = require('../controllers/userController');
const { protect, adminPriviledge } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser);
router.route('/').get(protect,adminPriviledge,getAllUsers);
router.route('/login').post(authUser);
router.route('/profile').get(protect,getUserProfile);
router.route('/profile').put(protect,updateUserProfile);
router.route('/:id').delete(protect,adminPriviledge,deleteUser);
router.route('/:id').get(protect,adminPriviledge,getUserById);
router.route('/:id').put(protect,adminPriviledge,updateUser);

   
module.exports = router;
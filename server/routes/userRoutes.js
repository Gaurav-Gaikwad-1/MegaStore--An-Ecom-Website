const express = require('express')
// const  userController = require('../controllers/userController')

const { authUser ,getUserProfile,registerUser,updateUserProfile} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').get(protect,getUserProfile);
router.route('/profile').put(protect,updateUserProfile);
   
module.exports = router;
const express = require('express')
const router = express.Router()
const { authUser } = require('../controllers/userController')
const { userProfile } = require('../controllers/userProfileController')
const { protect } = require('../middleware/authMiddleware')

// router.route('/profile').get(getUserProfile)
router.get('/profile',userProfile)

router.post('/login',authUser)              //router.route('/login').get(authUser) 
// router.route('/profile').get(getUserProfile)

module.exports = router 
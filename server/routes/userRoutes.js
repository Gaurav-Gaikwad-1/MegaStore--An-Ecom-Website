const express = require('express')
const { authUser,getUserProfile } = require('../controllers/userController')
const router = express.Router()



router.post('/login', authUser)

module.exports = router
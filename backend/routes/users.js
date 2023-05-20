const express = require('express')
const { loginUser, signupUser } = require('../controllers/usersController') // import functions
const router = express.Router()

// routes
router.post('/login', loginUser)
router.post('/signup', signupUser)

module.exports = router
const express = require('express')
const { loginUser, signupUser, subscribe } = require('../controllers/usersController') // import functions
const router = express.Router()
const requireUser = require('../middleware/requireUser')

// routes
router.post('/login', loginUser)
router.post('/signup', signupUser)
router.use(requireUser)
router.get('/subscribe', subscribe)

module.exports = router
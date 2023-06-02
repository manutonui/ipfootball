const express = require('express')
const { loginUser, signupUser, subscribe, fetchUsers } = require('../controllers/usersController') // import functions
const router = express.Router()
const requireUser = require('../middleware/requireUser')
const requireManager = require('../middleware/requireManager')

// routes
router.post('/login', loginUser)
router.post('/signup', signupUser)
router.use('/subscribe', requireUser)
router.get('/subscribe', subscribe)

router.use(requireManager)
router.get('/all', fetchUsers)

module.exports = router
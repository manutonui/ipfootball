const express = require('express')
const { loginUser, signupUser, subscribe, fetchUsers, checkPayment } = require('../controllers/usersController') // import functions
const router = express.Router()
const requireUser = require('../middleware/requireUser')
const requireManager = require('../middleware/requireManager')

// routes
router.post('/login', loginUser)
router.post('/signup', signupUser)
router.use('/subscribe', requireUser)
router.post('/subscribe', subscribe)
router.use('/querystk', requireUser)
router.post('/querystk', checkPayment)

router.use(requireManager)
router.get('/all', fetchUsers)

module.exports = router
const express = require('express')
const { loginManager, signupManager } = require('../controllers/managersController')

const router = express.Router()

router.post('/login', loginManager)
router.post('/signup', signupManager)

module.exports = router
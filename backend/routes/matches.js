const express = require('express')
const {getMatches, postMatch, pastMatches, deleteMatch, updateMatch, fetchMatches} = require('../controllers/matchesController')
const requireManager = require('../middleware/requireManager')
const router = express.Router()

router.get('/date/today', getMatches)
router.get('/date/:date', getMatches)
router.get('/past', pastMatches)
router.get('/all', fetchMatches) // auth

router.use(requireManager) // middleware
router.post('/new', postMatch)
router.patch('/update/:id', updateMatch)
router.delete('/delete/:id', deleteMatch)

module.exports = router

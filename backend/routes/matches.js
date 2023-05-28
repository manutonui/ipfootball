const express = require('express')
const {getMatches, postMatch, deleteMatch, updateMatch, fetchMatches} = require('../controllers/matchesController')
const requireManager = require('../middleware/requireManager')
const router = express.Router()

router.get('/date/today', getMatches)
router.get('/date/:date', getMatches) // to get yesterday matches
router.get('/all', fetchMatches) // auth

router.use(requireManager) // middleware
router.post('/new', postMatch)
router.patch('/update/:id', updateMatch)
router.delete('/delete/:id', deleteMatch)

module.exports = router

const express = require('express')
const {getMatches, postMatch, deleteMatch, updateMatch, fetchMatches, getSpecialMatches, getPrevMatches} = require('../controllers/matchesController')
const requireManager = require('../middleware/requireManager')
const requireUser = require('../middleware/requireUser')
const router = express.Router()

router.get('/date/today', getMatches)
router.get('/date/:date', getMatches) // to get yesterday matches
router.get('/prev/:date', getPrevMatches)

router.use('/vip',requireUser)
router.get('/vip/:date', getSpecialMatches)

router.use(requireManager) // middleware
router.post('/new', postMatch)
router.patch('/update/:id', updateMatch)
router.delete('/delete/:id', deleteMatch)
router.get('/all', fetchMatches) // auth

module.exports = router

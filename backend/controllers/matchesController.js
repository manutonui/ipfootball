const Match = require('../models/Match')

const getMatches = async (req, res) => {
    const {date} = req.params // if provided
    const today = new Date().toISOString().split('T')[0]
    let matches = []
    if (date) matches = await Match.find({date})
    else matches = await Match.find({date: today}) // todays
    res.status(200).json(matches)
}

const pastMatches = async (req, res) => {
    const today = new Date().toISOString().split('T')[0]
    const matches = await Match.find({ date: {$lt: today} }).sort({date: -1})
    res.status(200).json(matches)
}

const fetchMatches = async (req, res) => {
    const matches = await Match.find().sort({date: -1})
    res.status(200).json(matches)
}

const postMatch = async (req, res) => {
    const {home, away, date, tip, odds} = req.body
    if (!home || !away || !date || !tip || !odds) return res.status(400).json({ error: "All fields are required." })
    const fixture = home+' - '+away
    
    try {
        const match = await Match.create({fixture, date, tip, odds})
        res.status(200).json(match)
    } catch (e) {
        res.status(400).json({error: e.message })
    }
    
}

const updateMatch = async (req, res) => {
    const {id} = req.params
    const {home, away} = req.body
    if ( home && away ) req.body.fixture = home+' - '+away

    try {
        const match = await Match.findOneAndUpdate({_id: id}, {...req.body}, {new: true})
        res.status(200).json(match)
    } catch (e) {
        res.status(400).json({error: "Match not found!"})
    }
}

const deleteMatch = async (req, res) => {
    const {id} = req.params
    try {
        const match = await Match.findOneAndDelete({_id: id})
        res.status(200).json(match)
    } catch (e) {
        res.status(400).json({error: "Match not found!"})
    }
}

module.exports = { getMatches, postMatch, pastMatches, updateMatch, deleteMatch, fetchMatches }
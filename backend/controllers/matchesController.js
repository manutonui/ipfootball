const Match = require('../models/Match')
const Manager = require('../models/Manager')

const getMatches = async (req, res) => {
    const {date} = req.params // if provided
    const today = new Date().toISOString().split('T')[0]
    let matches = []
    if (date) matches = await Match.find({date})
    else matches = await Match.find({date: today}) // todays
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
    let author = await Manager.findOne({_id:req.manager_id})
    
    try {
        const match = await Match.create({fixture, date, tip, odds, author:author.identity})
        res.status(200).json(match)
    } catch (e) {
        res.status(400).json({error: e.message })
    }
    
}

const updateMatch = async (req, res) => {
    const {id} = req.params
    const {home, away} = req.body
    if ( home && away ) req.body.fixture = home+' - '+away
    let author = await Manager.findOne({_id:req.manager_id})

    try {
        const match = await Match.findOneAndUpdate({_id: id}, {...req.body, author:author.identity}, {new: true})
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

module.exports = { getMatches, postMatch, updateMatch, deleteMatch, fetchMatches }
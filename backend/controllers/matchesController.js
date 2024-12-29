const Match = require('../models/Match')
const Manager = require('../models/Manager')
const api = process.env.API
const fs = require('fs');
const path = require('path');

const saveRespToFile = (json) => {
    // Convert JSON data to a string
    const jsonString = JSON.stringify(json); // Pretty-print with 2 spaces

    // Write JSON string to a file
    const date = new Date('Ymd')
    console.log(date)
    fs.writeFile(`matches-${date}.json1`, jsonString, (err) => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('JSON data saved to data.json');
    }
    });
}

const getMatches = async (req, res) => {
    const {date} = req.params // if provided
    // let matches = await Match.find({date, category: {$ne: 'paid'}})
    // let matches = await Match.find({date})
    let matches = await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "endpoint" : "fixtures",
            "params" : {
                "date": "2024-12-21"
            }
        }),
    })
    matches = await matches.json()
    console.log("Matches: ", matches)
    
    
    res.status(200).json(matches)
}

// today free matches

const getSpecialMatches = async (req, res) => {
    // Rem: req has user id
    const {date} = req.params // if provided
    let matches = await Match.find({date, category: 'paid'})
    res.status(200).json(matches)
}

const getPrevMatches = async (req, res) => {
    const {date} = req.params
    const y = new Date()
    const d = new Date(date)
    y.setDate(y.getDate()-1)
    let matches = []
    if (y>d) {
        matches = await Match.find({date})
    }
    res.status(200).json(matches)
}

// get all prev matches and not paid matches

const fetchMatches = async (req, res) => {
    const matches = await Match.find().sort({date: -1})
    res.status(200).json(matches)
}

const postMatch = async (req, res) => {
    console.log(req.body)
    const {home, away, date, tip, odds, category} = req.body
    if (!home || !away || !date || !tip || !odds || !category) return res.status(400).json({ error: "All fields are required." })
    const fixture = home+' - '+away
    let author = await Manager.findOne({_id:req.manager_id})
    
    try {
        const match = await Match.create({fixture, date, tip, odds, author:author.identity, category})
        res.status(200).json(match)
    } catch (e) {
        res.status(400).json({error: e.message })
    }
    
}

const updateMatch = async (req, res) => {
    const {id} = req.params
    const {home, away} = req.body
    if ( home && away ) req.body.fixture = home+' - '+away
    req.body.result = req.body.result.replace(/\s/g, '');
    let author = await Manager.findOne({_id:req.manager_id})

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

module.exports = { getMatches, postMatch, updateMatch, deleteMatch, fetchMatches, getSpecialMatches, getPrevMatches }
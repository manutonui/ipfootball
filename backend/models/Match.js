const mongoose = require('mongoose')

const { Schema, model } = mongoose

const matchSchema = new Schema({
    fixture: {type: String, required: true},
    date: {type: Date, required: true},
    tip: {type: String, required: true},
    result: {type: String, default: '?'},
    status: {type: String, default: '?'},
    odds: {type: Number, required: true}
})

module.exports = model('Match', matchSchema)
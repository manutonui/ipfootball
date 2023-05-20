const User = require('../models/User')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
    const {identity, password} = req.body // deconstruct id & pwd from req
    try {
        const user = await User.login(identity, password) // login()
        const token = createToken(user._id)
        res.status(200).json({identity,token})
    } catch (e) { console.log(e);res.status(400).json({error: e.message}) }
}

const signupUser = async (req, res) => {
    const {identity, password} = req.body
    try {
        const user = await User.signup(identity, password)
        const token = createToken(user._id) // for auto login on signup
        res.status(200).json({identity,token})
    } catch (e) { res.status(400).json({error: e.message}) }
}

// returns jwt token of signs user id with a secret key
const createToken = (user_id) => jwt.sign({id: user_id }, process.env.SECRET, {expiresIn: '1h'})

module.exports = { loginUser, signupUser }
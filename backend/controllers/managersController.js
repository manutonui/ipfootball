const Manager = require('../models/Manager')
const jwt = require('jsonwebtoken')


const loginManager = async (req, res) => {
    const {identity, password} = req.body
    try {
        const manager = await Manager.login(identity, password)
        const token = createToken(manager._id) // create token
        res.status(200).json({identity,token})
    } catch (e) { res.status(400).json({error: e.message}) }
}

const signupManager = async (req, res) => {
    const {identity, password} = req.body
    try {
        const manager = await Manager.signup(identity, password)
        const token = createToken(manager._id) // 
        res.status(200).json({identity,token})
    } catch (e) { res.status(400).json({error: e.message}) }
}

const createToken = (user_id) => jwt.sign({id: user_id }, process.env.SECRET, {expiresIn:'3h'}) // signs the id

module.exports = { loginManager, signupManager }

const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Manager = require('../models/Manager')
const managers = process.env.MANAGERS.split(',')

const requireUser = async (req, res, next) => {
    const {authorization} = req.headers
    if ( !authorization ) return res.status(401).json({error: 'Auth token required'})
    const token = authorization.split(' ')[1]

    try {
        const dtoken = jwt.verify(token, process.env.SECRET, (err, res)=>{
            if (err) { return null }
            else { return res }
        })

        if ( !dtoken ) { return res.status(401).json({error: 'Token expired.', fix: 'refresh'}) } // set auto -logout in frontend

        const id = dtoken.id
        const user = await User.findOne({_id:id})
        if ( user ) {
            req.user_id = user._id
            next () // user found > check if paid
        } else if ( !user ) {
            const manager = await Manager.findOne({_id:id})
            if ( managers.includes(manager.identity) ) {
                // req.manager_id = manager._id
                next()
            }
        }
        else res.status(400).json({error: 'Permission denied', reason: 'User has not paid'}) // no user
        
    } catch (e) {
        res.status(401).json({error: 'Permission denied', reason: 'User not found'})
    }

}

module.exports = requireUser
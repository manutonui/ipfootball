const jwt = require('jsonwebtoken')
const Manager = require('../models/Manager')
const managers = process.env.MANAGERS.split(',')

const requireManager = async (req, res, next) => {
    const {authorization} = req.headers
    if ( !authorization ) return res.status(401).json({error: 'Auth token required'})
    const token = authorization.split(' ')[1]

    try {
        const dtoken = jwt.verify(token, process.env.SECRET, (err, res)=>{
            if (err) return null
            else return res
        })

        if ( !dtoken ) { return res.status(401).json({error: 'Token expired.', fix: 'refresh'}) } // logout fronted (del key value item)

        const id = dtoken.id
        const manager = await Manager.findOne({_id:id})

        if ( managers.includes(manager.identity) ) {
            req.manager_id = manager._id
            next()
        } else res.status(400).json({error: 'Permission denied, not listed.'})
        
    } catch (e) {
        res.status(401).json({error: 'Permission denied'})
    }

}

module.exports = requireManager
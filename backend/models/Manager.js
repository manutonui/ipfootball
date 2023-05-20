const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const isListed = (identity) => {
    const listedManagers = process.env.MANAGERS.split(',')
    if ( listedManagers.includes(identity) ) return true
    return false
}

const {Schema,model} = mongoose

const managerSchema = new Schema({
    identity: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// static methods: signup, login
managerSchema.statics.signup = async function(identity, password){
    if (!identity || !password) throw Error("All fields are required.")
    if (!isListed(identity)) throw Error("Permission denied.") // check if is listed
    
    const identified = await this.findOne({identity})
    if (identified) { throw Error('User already exists.') } // Validation
    
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt) // Hash
    
    const manager = this.create({identity, password: hash}) // create
    return manager
}


managerSchema.statics.login = async function (identity, password) {
    if (!identity || !password) throw Error("All fields are required.")
    if (!isListed(identity)) throw Error("Permission denied.") // check if email is listed
    const manager = await this.findOne({identity})
    if (!manager) { throw Error('User not found.') }
    const trueMatch = await bcrypt.compare(password, manager.password)
    if (!trueMatch) { throw Error('Incorrect password')}
    return manager
}

module.exports = model('Manager', managerSchema)
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const {Schema,model} = mongoose

const userSchema = new Schema({
    identity: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

// static methods: signup, login
userSchema.statics.signup = async function(identity, password){
    if (!password || !identity) throw Error("All fields are required.")

    // Validation
    const identified = await this.findOne({identity})
    if (identified) { throw Error('User already exists.') }
    const salt = await bcrypt.genSalt(10) // gen salt of pwd hash
    const hash = await bcrypt.hash(password, salt) // Hash pwd
    const user = this.create({identity, password: hash}) // create
    return user
}


userSchema.statics.login = async function (identity, password) {
    if (!identity || !password) throw Error("All fields are required.")
    const user = await this.findOne({identity})
    if (!user) { throw Error('User not found.') }
    const trueMatch = await bcrypt.compare(password, user.password)
    if (!trueMatch) { throw Error('Incorrect password.')}
    return user
}

module.exports = model('User', userSchema)
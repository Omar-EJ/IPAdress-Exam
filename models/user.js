const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const uniqueValidator = require('mongoose-unique-validator')

let userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    }
},{
    collection: 'User'
})

module.exports = mongoose.model('User',userSchema)


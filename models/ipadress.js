const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ipAdressSchema = new Schema({
    nomMachine: {
        type: String,
        unique: true,
    },
    adresseIP: {
        type: String,
        unique: true,
    },
    etat: {
        type: String,
        default: 'arretée'
    },
    OS:{
        type:String,
    }
},{
    collection: 'IPAdress'
})

module.exports = mongoose.model('IPAdress',ipAdressSchema)


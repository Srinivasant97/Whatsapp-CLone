const mongoose = require('mongoose')

const WhatsappDbSchema = mongoose.Schema({
    message : String,
    name:String,
    timestamp:String,
    received:Boolean
})


module.exports = mongoose.model('Message' ,WhatsappDbSchema)
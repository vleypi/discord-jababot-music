const mongoose = require('mongoose')

const User = new mongoose.Schema({
    discordId: {type: String,required: true},
    userName: {type: String, required: true},
    guild: {type: Array, required: true},
    avatar: {type: String, required: true},
})

module.exports = mongoose.model('User',User)

const languges = require('../../../languages/languages.json')

module.exports = async (msg) =>{
    msg.reply({content: languges.translations.HELP.russian})
    return
}
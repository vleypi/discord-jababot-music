const languges = require('../../../languages/languages.json')

module.exports = async (msg,serverQueue) =>{
    if (!msg.member.voice.channel){
        return msg.channel.send(languges.translations.SKIP.ERROR_1.russian);
    }
    if (!serverQueue){
        return msg.channel.send(languges.translations.SKIP.ERROR_2.russian);
    }
    serverQueue.connection.dispatcher.end();
}
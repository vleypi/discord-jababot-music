const languges = require('../../../languages/languages.json')
const queue = require('../functions/queue.js')


module.exports = async (msg,serverQueue) =>{
    if (!msg.member.voice.channel){
        return msg.channel.send(languges.translations.FORCE_SKIP.ERROR_1.russian);
    }
    if (!serverQueue){
        return msg.channel.send(languges.translations.FORCE_SKIP.ERROR_2.russian);
    }
    
    serverQueue.voiceChannel.leave();
    queue.delete(msg.guild.id);
    return;
}

    
  
const ytdl = require('ytdl-core-discord')
const queue = require('../functions/queue.js')

module.exports = play = async (msg,song) =>{
    try{
        const serverQueue = queue.get(msg.guild.id);
        
        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(msg.guild.id);
            return;
        }

        var stream = await ytdl(`${song.url}`, {
            filter: "audioonly",
            opusEncoded: true
        })

        const dispatcher = serverQueue.connection.play(stream,{seek: 0, volume: 1, type: "opus"})
        
        dispatcher.on('finish',async ()=>{
            serverQueue.songs.shift();
            await play(msg, serverQueue.songs[0])
        })

        dispatcher.on('error',async ()=>{ 
            serverQueue.songs.shift();
            await play(msg, serverQueue.songs[0])
        })
    
    }
    catch(err){
        console.log(err)
        msg.reply({content: 'Что-то ничего не нашел по этому запросу...'})
        return
    }
}
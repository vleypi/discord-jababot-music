const ytSearch = require('yt-search')
const getYouTubeID = require('get-youtube-id')
const play = require('../functions/play')
const queue = require('../functions/queue.js')
const languges = require('../../../languages/languages.json')


module.exports = async (msg,serverQueue) =>{
    try{
        const voiceChannel = msg.member.voice.channel;

        if (!voiceChannel) {
            return msg.channel.send(
                languges.translations.SEAERCH.ERROR_1.russian
            );
        }
        
        const permissions = voiceChannel.permissionsFor(msg.client.user);

        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
                return msg.channel.send(
                    languges.translations.SEAERCH.ERROR_2.russian
            );
        }

        const content = msg.content.split(' ').slice(1).join(' ')

        if(!content){
            return msg.channel.send(
                languges.translations.SEAERCH.ERROR_3.russian
            );
        }

        const link = getYouTubeID(content)

        const {videos} = !link ? await ytSearch(content) : {videos: [{url: `https://youtube.com/watch?v=${link}`, title: `https://youtube.com/watch?v=${link}`}]}

        if(!videos.length){
            return msg.channel.send(
                languges.translations.SEAERCH.ERROR_4.russian
            );
        }

        const song = {
            title: videos[0].title,
            url:  videos[0].url,
        };

        if (!serverQueue) {
            const queueContruct = {
                textChannel: msg.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                playing: true
            };
        
            queue.set(msg.guild.id, queueContruct);
        
            queueContruct.songs.push(song);
        
            try {
                var connection = await voiceChannel.join();
                queueContruct.connection = connection;
                await play(msg, queueContruct.songs[0]);
                msg.channel.send(song.url)
            } 
            catch (err) {
                queue.delete(msg.guild.id);
            }
        } 
        else {
            serverQueue.songs.push(song);
            return msg.channel.send(`${song.url} ${languges.translations.SEAERCH.ADDED.russian}`);
        }
    }
    catch(err){
        console.log(err)
    }
}
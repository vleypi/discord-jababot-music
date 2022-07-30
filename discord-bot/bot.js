module.exports = () =>{
	const { Client, Intents} = require('discord.js');
	const queue = require('./components/music/functions/queue.js');

	const client = new Client({ intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_INVITES,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_WEBHOOKS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	]})


	const music =  require('./components/music/music.js')

	client.on('ready',()=>{
		console.log('ready')
	})

	client.on('message',async (msg) =>{
		if (msg.author.bot) return;

		if (!msg.content.startsWith("-")) return;

		const serverQueue = queue.get(msg.guild.id)

		if(serverQueue && !serverQueue.connection.player.dispatcher){

			queue.delete(msg.guild.id)

			music(msg,null)
		}
		else{
			music(msg,serverQueue)
		}

	})


	client.login('ODg4MzYzOTA1MDQ1MzY0NzM2.YURnWw.18y_cpONG8b58z_Vx-dBqk7Xp_w');
}
